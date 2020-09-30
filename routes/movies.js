const mongoose = require("mongoose");
const { genres } = require('../models/genres');
const movies = require("../models/movies");
const express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  movies.find({}, (err, success) => {
    if (err)
      console.log(err.message);
    else
      console.log(success);
  })
})

router.post("/",async (req, res) => {
  let newGenre = await genres.findById(req.body.ID, (err, success) => {
    if (err)
      console.log(err);
    else
      console.log(success);
  });

  let createMovie = new movies({
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    genre: {
      _id: req.body.ID,
      name: newGenre.name
    }
  });

  movies.create(createMovie, (err, success) => {
    if (err)
      console.log(err.message);
    else
      console.log(success);
  })

  // let newGenre = genres.findById(req.body.genreID);
  // let movie = new movies({
  //   title: req.body.title,
  //   numberInStock: req.body.numberInStock,
  //   dailyrentalRate: req.body.dailyrentalRate,
  //   genre: {
  //     _id: newGenre._id,
  //     name:newGenre.name
  //   }
  // })

  // movie = movie.save();
  // console.log(movie);
})

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
