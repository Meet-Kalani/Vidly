const mongoose = require("mongoose");
const customers = require("../models/customers");
const express = require("express");
let router = express.Router();

router.get("/:id", (req, res) => {
  customers.findById({ _id: req.params.id }, (err, foundGenres) => {
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
      phone: req.body.phone,
      isGold: req.body.isGold
  };

  if (req.body.name == "" || req.body.phone.length > 6) {
    res.send("Type is required and it has to be 3 character long!");
    return;
  }

  customers.update({ _id: req.params.id }, updatedGenre, (err, success) => {
    if (err) res.status(404).send(err.message);
    else res.redirect("/");
  });
});

router.delete("/:id", (req, res) => {
  customers.deleteOne({ _id: req.params.id }, (err, success) => {
    if (err) res.status(404).send(err.message);
    else res.redirect("/");
  });
});

module.exports = router;
