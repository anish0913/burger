// Express & Model
var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

// GET route 
router.get("/", function (req, res) {
  burger.all(function (data) {
    var dataObj = {
      burger: data
    };
    console.log(dataObj);
    res.render("index", dataObj);
  });
});

// POST route 
router.post("/api/burgers", function (req, res) {
  burger.create(req.body.name, function (result) {
    res.json({ id: result.insertId });
  });
});

// Updating PUT route 
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.update(
    {
      devoured : req.body.devoured
    },
    condition, function (result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  })
});

// Export routes 
module.exports = router;