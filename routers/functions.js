const express = require("express");
const exec = require("child_process").exec;
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/functions/ping", auth, async (req, res) => {
  try {
    const { ip } = req.body;
    var ping = exec(`ping ${ip}`);
    ping.stdout.on("data", function(data) {
      res.status(200).send({ message: data });
    });
    ping.stderr.on("data", function(data) {
      res.status(500).send({ message: data });
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
