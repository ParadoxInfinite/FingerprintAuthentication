const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const router = express.Router();

router.get('/adminpanel', (req,res,next)=>{
  res.render('adminlogin');
  next();
});

router.post('/adminpanel', (req, res, next) => {
    MongoClient.connect('mongodb://localhost:27017/bankdb', {
    useNewUrlParser: true
  }, function(err, client) {
    if (err) throw err

    var db = client.db('bankdb')

    db.collection('users').find().toArray(function(err, result) {
      if (err) throw err
      res.render('adminpanel', {
        'results': result,
      });
      res.end()
    })
  })
});

router.delete('/adminpanel',(req,res,next)=>{
  MongoClient.connect('mongodb://localhost:27017/bankdb', {
    useNewUrlParser: true
  }, function(err, client) {
    if (err) throw err;

    var db = client.db('bankdb')

    db.collection("users").deleteOne({'cardno':req.body.cardno}, function(err, obj) {
      if (err) throw err;
    });
  });
  res.end()
})


module.exports = router;