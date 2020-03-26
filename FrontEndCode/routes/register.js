const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const router = express.Router();
var accno = 1000001
var customerid = 99999001

function CaptureFinger(quality, timeout) {
  var MFS100Request = {
      "Quality": quality,
      "TimeOut": timeout
  };
  var jsonData = JSON.stringify(MFS100Request);
  return PostMFS100Client("capture", jsonData);
}

function PostMFS100Client(method, jsonData) {
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

router.get('/register', (req, res, next) => {
  customerid+=1;
  accno+=1;
  res.render('register',{
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
    //var regdata = { customerid: cid , name: cname, accno : ano, cardno : cno, acctype: atype, fingerprint: fp, pin : pin, balance: bal }
    db.collection('users').insertOne(req.body);
  })
  res.redirect('index');
});

module.exports = router;