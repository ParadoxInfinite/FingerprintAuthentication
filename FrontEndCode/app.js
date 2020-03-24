// Requiring packages that will be used.
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/authentication');
const registerRoutes = require('./routes/register');
const session = require('express-session');

app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false})); // Setting the session and secret for the context to be passed.

app.set('view engine', 'ejs'); // Setting the view engine to ejs so it renders the ejs files. 

app.use(bodyParser.json()); // BodyParser to retrieve data from req.body.
app.use(bodyParser.urlencoded({
  extended: true
}));
  
app.use(express.static(path.join(__dirname, 'public'))) // Declaring the public directory to limit exposure to the server.

// Connecting all the routes to the main app.js
app.use(indexRoutes)
app.use(authRoutes)
app.use(registerRoutes)

app.get('/', (req, res, next) => { // Redirecting the requests/hits on '/' to '/index'
    res.redirect('/index')
    next();
  })
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html')) // If there is an attempt to access invalid URL, 404 page is displayed.
  })
app.listen(5000); //Listening on port 5000 (localhost:5000). Can be changed later.