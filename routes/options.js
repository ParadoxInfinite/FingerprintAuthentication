var express = require("express"); // express for router
const router = express.Router(); // Router for routing to other pages in routes and also to refer in app.js

router.get("/options", (req, res) => {
  var userdata = req.session.context; // Context is passed from index.js which contains relevant user info.
  if (userdata) {
    // If the user has a registered fingerprint, the page is rendered with a fingerprint option.
    res.render("options", {
      name: userdata.name,
      fingerprint: true,
      result: "",
      balance: "",
    });
  } else {
    res.status(401).render("401");
  }
});
router.post("/options", (req, res) => {
  var userdata = req.session.context; // Context is passed from index.js which contains relevant user info.
  if (userdata) {
    // If the user has a registered fingerprint, the page is rendered with a fingerprint option.
    res.render("options", {
      name: userdata.name,
      fingerprint: true,
      result: "",
      balance: userdata.balance,
    });
  } else {
    res.status(401).render("401");
  }
});
module.exports = router;
