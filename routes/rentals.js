const mongoose = require("mongoose");
const { customers } = require('../models/customers');
const movies = require('../models/movies');
const rentals = require("../models/rentals");
const express = require("express");
let router = express.Router();

router.get("/:id", (req, res) => {
  rentals.findById({ _id: req.params.id }, (err, foundRental) => {
    if (err) {
      res.status(404).send(err.message);
    } else {
      res.render("index", { rentals: foundRental });
      console.log(foundRental);
    }
  });
});

router.put("/:id", (req, res) => {
    // mosh style
    const customer = customers.findById(req.body.customerID);

    const movie = movies.findById(req.body.movieID);

    let rental = new rentals({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    
    rental = rental.save();

    movie.numberInStock--;
    movie.save();

    res.send(rental);

    // my style
//   let updatedRental = {
//       customer: {
//           _id:
//       }
//   };

//   rentals.update({ _id: req.params.id }, updatedRental, (err, success) => {
//     if (err) res.status(404).send(err.message);
//     else res.redirect("/");
//   });
});

router.delete("/:id", (req, res) => {
  rentals.deleteOne({ _id: req.params.id }, (err, success) => {
    if (err) res.status(404).send(err.message);
    else res.redirect("/");
  });
});

module.exports = router;
