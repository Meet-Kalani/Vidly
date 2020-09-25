const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log('Hii from routes file');
  genres.find({}, (err, foundGenres) => {
    if (err) res.status(404).send(err.message);
    else res.render("index", { genres: foundGenres });
  });
});

router.get("/api/genres/:id", (req, res) => {
  genres.findById({ _id: req.params.id }, (err, foundGenres) => {
    if (err) {
      res.status(404).send(err.message);
    } else {
      res.render("index", { genres: foundGenres });
    }
  });
});

router.post("/", (req, res) => {
  let newGenre = {
    name: req.body.name,
  };

  if (req.body.name == "" || req.body.name.length < 3) {
    res.status(403).send("Type is required and it has to be 3 character long!");
    return;
  }

  genres.create(newGenre, (err, success) => {
    if (err) res.status(404).send(err.message);
    else res.redirect("/");
  });
});

router.put("/api/genres/:id", (req, res) => {
  let updatedGenre = {
    name: req.body.name,
  };

  if (req.body.name == "" || req.body.name.length < 3) {
    res.send("Type is required and it has to be 3 character long!");
    return;
  }

  genres.update({ _id: req.params.id }, updatedGenre, (err, success) => {
    if (err) res.status(404).send(err.message);
    else res.redirect("/");
  });
});

router.delete("/api/genres/:id", (req, res) => {
  genres.deleteOne({ _id: req.params.id }, (err, success) => {
    if (err) res.status(404).send(err.message);
    else res.redirect("/");
  });
});

router.get("/:one/:two/:three", (req, res) => {
  res.send(
    `/${req.params.one}/${req.params.two}/${req.params.three} is not available! Sorry for inconvenience`
  );
});

module.exports = router;
