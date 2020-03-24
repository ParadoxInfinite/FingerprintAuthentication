// Requiring packages that will be used.
var jsdom = require('jsdom'); // jsdom needed for jQuery to work in node.
var express = require('express'); // express for router
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
var $ = jQuery = require('jquery')(window); // Creating a window where the jQuery can execute since this is backend.
global.document = document;
const router = express.Router(); // Router for routing to other pages in routes and also to refer in app.js


//var uri = "https://localhost:8003/mfs100/";  //Secure [Not used now because of certificate issue]
var uri = "http://localhost:8004/mfs100/"; // Not secure but works for now.


// Function to call when a POST request is made to authentication.js
function MatchFinger(quality, timeout, GalleryFMR) { //Parameters are set in the calling function. Hardcoded for now, can make var
    // Creating an Object to pass data to the next function
    var MFS100Request = {
        "Quality": quality,
        "TimeOut": timeout,
        "GalleryTemplate": GalleryFMR,
        "BioType": "FMR" // you can paas here BioType as "ANSI" if you are using ANSI Template
    };
    var jsonData = JSON.stringify(MFS100Request); // Converting the object to a string so that it can be used in Ajax request.
    return PostMFS100Client("match", jsonData);
}

// Function to make a call to the MFS client service to match the data.
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

// If the Ajax request isn't successful, this defines what type of error occured.
function getHttpError(jqXHR) {
    var err = "Unhandled Exception";
    if (jqXHR.status === 0) {
        err = 'Service Unavailable';
    } else if (jqXHR.status == 404) {
        err = 'Requested page not found';
    } else if (jqXHR.status == 500) {
        err = 'Internal Server Error';
    } else if (thrownError === 'parsererror') {
        err = 'Requested JSON parse failed';
    } else if (thrownError === 'timeout') {
        err = 'Time out error';
    } else if (thrownError === 'abort') {
        err = 'Ajax request aborted';
    } else {
        err = 'Unhandled Error';
    }
    return err;
}

// GET request to '/authentication' is handled here.
router.get('/authentication', (req, res, next) => {
    var userdata = req.session.context; // Context is passed from index.js which contains relevant user info.
    if(userdata.fingerprint){ // If the user has a registered fingerprint, the page is rendered with a fingerprint option.
    res.render('authentication', {
      'name' : userdata.name,
      'fingerprint' : true,
      'result' : ""
  });
  }
  else { // If the user has no fingerprint, no option for fingerpint is shown.
    res.render('authentication', {
      'name' : userdata.name,
      'fingerprint' : false,
      'result' : ""
  });
  }
});

// POST request to '/authentication' is handled here.
router.post('/authentication', (req,res,next)=>{
    var userdata = req.session.context;
    var isoTemplate = userdata.fingerprint;
    var resu = MatchFinger(80, 10, isoTemplate); // Calling the MatchFinger function to compare the stored FP data to captured FP data.
   if (resu.httpStatus) { // If the request was successful, enters this condition.
    if (resu.data.Status) { //If both the FPs were a match, enters this condition.
      res.render('authentication',{
        'name' : userdata.name,
        'result' : "Fingerprint Matched",
        'fingerprint' : true
      })
    }
    else {
        if (resu.data.ErrorCode != "0") { //If there is an error in the FP data, the error code is displayed.
            console.log(resu.data.ErrorDescription);
        }
        else {
          res.render('authentication',{ //If the FPs aren't a match, it displays the message.
            'name' : userdata.name,
            'result' : "Fingerprint Not Matched",
            'fingerprint' : true
          })
        }
    } 
}
else { // If the Ajax request was not successful, it shows what went wrong.
    console.log(resu.err);
    }
})
module.exports = router;
