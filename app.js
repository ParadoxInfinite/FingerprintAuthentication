// Requiring packages that will be used.
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const path = require("path");
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/authentication");
const registerRoutes = require("./routes/register");
const adminRoutes = require("./routes/adminpanel");
const optionsRoutes = require("./routes/options");
const session = require("express-session");

// module.exports = function () {
// Uncomment this line and the last line to create executables using pkg
app.use(
  session({ secret: "mySecret", resave: false, saveUninitialized: false })
); // Setting the session and secret for the context to be passed.

app.use(express.static(path.join(__dirname, "public"))); // Declaring the public directory to limit exposure to the server.
app.use(express.static(path.join(__dirname, "views"))); // Declaring the views directory for pkg.

app.set("views", "./views"); //Setting the views directory for pkg executables to access .ejs files.
app.set("view engine", "ejs"); // Setting the view engine to ejs so it renders the ejs files.

app.use(bodyParser.json()); // BodyParser to retrieve data from req.body.
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Connecting all the routes to the main app.js
app.use(indexRoutes);
app.use(authRoutes);
app.use(registerRoutes);
app.use(adminRoutes);
app.use(optionsRoutes);

app.get("/", (req, res) => {
  // Redirecting the requests/hits on '/' to '/index'
  res.redirect("/index");
});
app.use((req, res) => {
  res.status(404).render("404"); // If there is an attempt to access invalid URL, 404 page is displayed.
});
app.listen(5000, () =>
  console.log(
    "App is running on port 5000. Visit http://localhost:5000/ to view."
  )
); //Listening on port 5000 (localhost:5000). Can be changed later.
// };
