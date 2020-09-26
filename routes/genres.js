const mongoose = require("mongoose");
const genres = require("../models/genres");
const express = require("express");
let router = express.Router();

router.get("/:id", (req, res) => {
  genres.findById({ _id: req.params.id }, (err, foundGenres) => {
    if (err) {
      res.status(404).send(err.message);
    } else {
      res.render("index", { genres: foundGenres });
      console.log(foundGenres);
    }
  });
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  genres.deleteOne({ _id: req.params.id }, (err, success) => {
    if (err) res.status(404).send(err.message);
    else res.redirect("/");
  });
});

module.exports = router;
