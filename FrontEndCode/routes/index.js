const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
// const path = require('path')
const router = express.Router();
router.get('/index', (req, res, next) => {
    res.render('index', {
      'rfiderr': false
    });
  });
router.post('/index',(req, res, next) => {
  var rfidval = req.body.rfidtag;
  MongoClient.connect('mongodb://localhost:27017/bankdb', {
    useNewUrlParser: true
  }, function(err, client) {
    if (err) throw err
    var db = client.db('bankdb')
    db.collection('users').find({'cardno': rfidval}).toArray(function(err, result) {
      if (err) throw err
      if(result[0]){
        req.session.context = result[0];
        res.redirect('/authentication')
      }
      else{
        res.render('index', {
          'rfiderr': true
        });
      }
    })
  })
});

module.exports = router;