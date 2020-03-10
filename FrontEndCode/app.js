const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const indexRoutes = require('./routes/index');

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.urlencoded({
  extended: false
}));
  
app.use(express.static(path.join(__dirname, 'public')))

app.use(indexRoutes)
app.get('/', (req, res, next) => {
    res.redirect('/index')
    next();
  })
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
  })
app.listen(5000);