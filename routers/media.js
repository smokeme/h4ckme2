const express = require("express");
const router = express.Router();
var fs = require("fs");

router.get("/media", async (req, res) => {
  var filename = req.query.file;
  try {
    fs.readFile("./uploads/" + filename, function(err, data) {
      console.log(err);
      res.end(data);
    });
  } catch (error) {
    console.log("error");
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
