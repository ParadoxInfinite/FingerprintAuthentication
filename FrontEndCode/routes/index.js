// Requiring packages that will be used.
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient //Requiring MongodbClient to access the DB
const router = express.Router();

// GET request to '/index' is handled here.
router.get('/index', (req, res, next) => { // This is the landing page of the project.
    res.render('index', {
      'rfiderr': false
    });
});

// POST request to '/index' is handled here.
router.post('/index',(req, res, next) => { // Once the RFID is entered, this is executed.
  var rfidval = req.body.rfidtag; // Getting the RFID value from the page.
  MongoClient.connect('mongodb://localhost:27017/bankdb', { // Connecting to our database (bankdb) on MongoDB
    useNewUrlParser: true
  }, function(err, client) { //Callback function for the connection
    if (err) throw err // If the connection fails, throws err
    var db = client.db('bankdb') // Var for ease of use and also traditional Mongo usage.
    db.collection('users').find({'cardno': rfidval}).toArray(function(err, result) { // Query to find the details of the entered RFID
      if (err) throw err // If the query encounters an error, throws err
      if(result[0]){ // If the RFID details found
        req.session.context = result[0]; // Setting the details as context for access in other routes.
        res.redirect('/authentication') // Proceed to authentication.
      }
      else{ // IF RFID details not found in DB
        req.session.context = rfidval;
        res.redirect('/register') // Route to registration.
      }
    })
  })
});

module.exports = router;