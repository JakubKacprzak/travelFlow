const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  fs.readFile("./data/offers.json", (err, data) => {
    if (err) {
      res.status(500).send("Error reading offers data");
    } else {
      res.json(JSON.parse(data));
    }
  });
});

module.exports = router;
