"use strict";

var express = require('express');

var router = express.Router();
var genres = [{
  id: 1,
  type: "Horror"
}, {
  id: 2,
  type: "Romance"
}, {
  id: 3,
  type: "Comedy"
}];
router.get("/", function (req, res) {
  res.send(genres); // res.render('index', { title: 'My Express App', message: 'Hello World!' });
});
router.get("/api/genres/:id", function (req, res) {
  var genre = genres.find(function (g) {
    return g.id === parseInt(req.params.id);
  });

  if (!genre) {
    res.status(404).send("The Genres with given ID is not available!");
    return;
  }

  res.send(genre);
});
router.post("/api/genres", function (req, res) {
  if (req.body.type == "" || req.body.type.length < 3) {
    res.send("Type is required and it has to be 3 character long!");
    return;
  }

  var newGenre = {
    id: genres.length + 1,
    type: req.body.type
  };
  genres.push(newGenre);
  res.send(genres);
});
router.put("/api/genres/:id", function (req, res) {
  var genre = genres.find(function (g) {
    return g.id === parseInt(req.params.id);
  });

  if (!genre) {
    res.status(404).send("The Genres with given ID is not available!");
    return;
  }

  if (req.body.type == "" || req.body.type.length < 3) {
    res.send("Type is required and it has to be 3 character long!");
    return;
  }

  genre.type = req.body.type;
  res.send(genres);
});
router["delete"]("/api/genres/:id", function (req, res) {
  var genre = genres.find(function (g) {
    return g.id === parseInt(req.params.id);
  });

  if (!genre) {
    res.status(404).send("The Genres with given ID is not available!");
    return;
  }

  var index = genres.indexOf(genre);
  var deletedGenre = genres.splice(index, 1);
  res.send(deletedGenre);
});
router.get("/:one", function (req, res) {
  res.send("/".concat(req.params.one, " is not available! Sorry for inconvenience"));
});
router.get("/:one/:two", function (req, res) {
  res.send("/".concat(req.params.one, "/").concat(req.params.two, " is not available! Sorry for inconvenience"));
});
router.get("/:one/:two/:three", function (req, res) {
  res.send("/".concat(req.params.one, "/").concat(req.params.two, "/").concat(req.params.three, " is not available! Sorry for inconvenience"));
});
module.exports = router;