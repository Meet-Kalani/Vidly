const mongoose = require("mongoose");
const movies = require("../models/movies");
const express = require("express");
let router = express.Router();

router.get("/:id", (req, res) => {
  movies.findById({ _id: req.params.id }, (err, foundMovies) => {
    if (err) {
      res.status(404).send(err.message);
    } else {
      res.render("index", { movies: foundMovies });
      console.log(foundMovies);
    }
  });
});

router.put("/:id", (req, res) => {
  let updatedMovie = {
      title: req.body.title,
      numberInStock: req.body.numberInStock,
      dailyrentalRate: req.body.dailyrentalRate,
      genre: req.body.genre
  };

  movies.update({ _id: req.params.id }, updatedMovie, (err, success) => {
    if (err) res.status(404).send(err.message);
    else res.redirect("/");
  });
});

router.delete("/:id", (req, res) => {
  movies.deleteOne({ _id: req.params.id }, (err, success) => {
    if (err) res.status(404).send(err.message);
    else res.redirect("/");
  });
});

module.exports = router;
