const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path')
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res, next) => {
    res.redirect('/index')
    next();
  })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.urlencoded({
  extended: false
}));
  
app.get('/index', (req, res, next) => {
    res.render('index', {
        'result' : "Fingerprint"
    });
  });
app.post('/index',(req, res, next) => {
  var rfidval = req.body.rfidtag;
  res.render('index', {
      'result' : rfidval  
  });
});
app.listen(5000);