const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
// const path = require('path')
const router = express.Router();


function CaptureFinger(quality, timeout) {
  // if (!PrepareScanner()) {
  //     return getFalseRes();
  // }
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




// router.post('/register', (req,res,next=>{

// });

router.get('/register', (req, res, next) => {
    res.render('register');
  });


module.exports = router;