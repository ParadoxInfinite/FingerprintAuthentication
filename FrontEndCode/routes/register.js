const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const router = express.Router();

// Variables to generate account number and customer id in register page. (This is temp, need to find a fix.)
var accno = 1000001
var customerid = 99999001

function CaptureFinger(quality, timeout) { // Same as authentication.js, refer there for info
  var MFS100Request = {
      "Quality": quality,
      "TimeOut": timeout
  };
  var jsonData = JSON.stringify(MFS100Request);
  return PostMFS100Client("capture", jsonData);
}

function PostMFS100Client(method, jsonData) { // Same as authentication.js, refer there for info
  var res;
  $.support.cors = true;
  var httpStatus = false;
  // Ajax request to match the fingerprint
  $.ajax({
      type: "POST",
      async: false,
      crossDomain: true,
      url: uri + method,
      contentType: "application/json; charset=utf-8",
      data: jsonData,
      dataType: "json",
      processData: false,
      success: function (data) { // Enters this if the request was answered, might not be a match still.
          httpStatus = true;
          res = { httpStatus: httpStatus, data: data };
      },
      error: function (jqXHR, ajaxOptions, thrownError) { // If the Ajax request fails, it enters this code.
          console.log("Ajaxops:" + ajaxOptions + " errthrown : " + thrownError)
          res = { httpStatus: httpStatus, err: getHttpError(jqXHR) };
      },
  });
  return res;
}

// GET request to /register handled here.
router.get('/register', (req, res, next) => { // Increment the customerid and accno to render. (Valid only in this session.)
  customerid+=1;
  accno+=1;
  res.render('register',{ // Render the page with incremented data
    'cardno' : req.session.context,
    'customerid' : JSON.stringify(customerid),
    'accno' : JSON.stringify(accno)
  });
});

router.post('/register', (req,res,next) => {
  MongoClient.connect('mongodb://localhost:27017/bankdb', { // Connecting to our database (bankdb) on MongoDB
    useNewUrlParser: true
  }, function(err, client) { //Callback function for the connection
    if (err) throw err // If the connection fails, throws err
    var db = client.db('bankdb') // Var for ease of use and also traditional Mongo usage.
    db.collection('users').insertOne(req.body); // req.body contains the exact JSON we need as a query to insert.
  })
  res.redirect('index'); // Redirect to index page after registration.
});

module.exports = router;