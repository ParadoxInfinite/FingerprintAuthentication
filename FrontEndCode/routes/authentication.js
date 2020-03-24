const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
// const path = require('path')
const router = express.Router();

router.get('/authentication', (req, res, next) => {
    var userdata = req.session.context;
    if(userdata.fingerprint){
    res.render('authentication', {
      'name' : userdata.name,
      'fingerprint' : true
  });
  }
  else {
    res.render('authentication', {
      'name' : userdata.name,
      'fingerprint' : false
  });
  }
  });

module.exports = router;