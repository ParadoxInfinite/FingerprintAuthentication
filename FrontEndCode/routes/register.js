const express = require("express");
var jsdom = require("jsdom");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const router = express.Router();
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM("").window;
var $ = (jQuery = require("jquery")(window)); // Creating a window where the jQuery can execute since this is backend.
global.document = document;
var uri = "http://localhost:8004/mfs100/";
// Variables to generate account number and customer id in register page. (This is temp, need to find a fix.)
var accno = 1000001;
var customerid = 99999001;

function CaptureFinger(quality, timeout) {
  // Same as authentication.js, refer there for info
  var MFS100Request = {
    Quality: quality,
    TimeOut: timeout,
  };
  var jsonData = JSON.stringify(MFS100Request);
  return PostMFS100Client("capture", jsonData);
}

function PostMFS100Client(method, jsonData) {
  // Same as authentication.js, refer there for info
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
    success: function (data) {
      // Enters this if the request was answered, might not be a match still.
      httpStatus = true;
      res = { httpStatus: httpStatus, data: data };
    },
    error: function (jqXHR, ajaxOptions, thrownError) {
      // If the Ajax request fails, it enters this code.
      console.log("Ajaxops:" + ajaxOptions + " errthrown : " + thrownError);
      res = { httpStatus: httpStatus, err: getHttpError(jqXHR) };
    },
  });
  return res;
}

// If the Ajax request isn't successful, this defines what type of error occured.
function getHttpError(jqXHR) {
  var err = "Unhandled Exception";
  if (jqXHR.status === 0) {
    err = "Service Unavailable";
  } else if (jqXHR.status == 404) {
    err = "Requested page not found";
  } else if (jqXHR.status == 500) {
    err = "Internal Server Error";
  } else if (thrownError === "parsererror") {
    err = "Requested JSON parse failed";
  } else if (thrownError === "timeout") {
    err = "Time out error";
  } else if (thrownError === "abort") {
    err = "Ajax request aborted";
  } else {
    err = "Unhandled Error";
  }
  return err;
}

// GET request to /register handled here.
router.get("/register", (req, res, next) => {
  // Increment the customerid and accno to render. (Valid only in this session.)
  customerid += 2;
  accno += 2;
  if (typeof req.session.context == "string") {
    res.render("register", {
      // Render the page with incremented data
      cardno: req.session.context,
      customerid: JSON.stringify(customerid),
      accno: JSON.stringify(accno),
    });
  } else {
    res.status(401).render("401");
  }
});

router.post("/register", (req, res) => {
  MongoClient.connect(
    "mongodb://localhost:27017/bankdb",
    {
      // Connecting to our database (bankdb) on MongoDB
      useNewUrlParser: true,
    },
    function (err, client) {
      //Callback function for the connection
      if (err) throw err; // If the connection fails, throws err
      var db = client.db("bankdb"); // Var for ease of use and also traditional Mongo usage.
      db.collection("users").insertOne(req.body); // req.body contains the exact JSON we need as a query to insert.
    }
  );
  res.render("registersuccess"); // Redirect to index page after registration.
});
router.post("/fingerCapture", (req, res) => {
  var resu = CaptureFinger(80, 10);
  if (resu.httpStatus) {
    res.json({
      httpStatus: resu.httpStatus,
      bitMapData: resu.data.BitmapData,
      isoTemplate: resu.data.IsoTemplate,
      quality: resu.data.Quality,
      errorDescription: resu.data.ErrorDescription,
    });
  } else {
    // If the Ajax request was not successful, it shows what went wrong.
    console.log(resu.err);
  }
});
module.exports = router;
