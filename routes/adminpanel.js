const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const router = express.Router();

// GET request to /adminpanel is handled here
router.get("/adminpanel", (req, res) => {
  // This request renders the adminlogin page
  res.render("adminlogin");
});

// POST request is handled here
router.post("/adminpanel", (req, res) => {
  // This is when the form is submitted, no auth for admin yet
  MongoClient.connect(
    "mongodb://localhost:27017/bankdb",
    {
      useNewUrlParser: true,
    },
    function (err, client) {
      if (err) throw err;

      var db = client.db("bankdb");

      db.collection("users")
        .find()
        .toArray(function (err, result) {
          if (err) throw err;
          res.render("adminpanel", {
            // Printing all entries in DB for admin to delete if needed.
            results: result,
          });
          res.end();
        });
    }
  );
});

// DELETE request is handled here
router.delete("/adminpanel", (req, res) => {
  // When a record needs to be deleted, we use this HTTP method
  MongoClient.connect(
    "mongodb://localhost:27017/bankdb",
    {
      useNewUrlParser: true,
    },
    function (err, client) {
      if (err) throw err;

      var db = client.db("bankdb");

      db.collection("users").deleteOne({ cardno: req.body.cardno }, function (
        err,
        obj
      ) {
        // The query to delete the record.
        if (err) throw err;
      });
    }
  );
  res.end();
});

module.exports = router;
