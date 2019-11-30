const express = require("express");
const Article = require("../models/Article");

const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/articles/add", auth, upload.single("image"), async (req, res) => {
  try {
    var errors = {};
    if (!req.body.title) {
      errors["title"] = "Title is required";
    }
    if (!req.body.body) {
      errors["body"] = "body is required";
    }
    if (Object.keys(errors).length > 0) {
      res.status(500).send({ errors });
    }
    var username = req.user.username;
    const article = new Article({
      ...req.body,
      image: req.file.filename,
      author: username
    });
    await article.save();
    res.status(201).send({ article });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/articles/delete", async (req, res) => {
  try {
    let id = req.body.id;
    Article.deleteOne({ _id: id }).then(err => {
      if (err) {
        console.log(err);
      }
      res.status(200).send({ message: "OK" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/articles", async (req, res) => {
  try {
    Article.find({}, function(err, articles) {
      res.status(200).send({ articles });
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
