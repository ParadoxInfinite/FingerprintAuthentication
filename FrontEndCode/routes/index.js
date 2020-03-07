const express = require('express');
const app = express();
// const path = require('path')
const router = express.Router();
router.get('/index', (req, res, next) => {
    res.render('index', {
        'result' : "Fingerprint"
    });
  });
router.post('/index',(req, res, next) => {
  var rfidval = req.body.rfidtag;
  res.render('index', {
      'result' : rfidval  
  });
});

module.exports = router;