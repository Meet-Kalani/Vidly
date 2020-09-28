const mongoose = require("mongoose");
const { genreSchema } = require('./genres');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  numberInStock: {
    type: Number,
    required: true,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
});

module.exports = mongoose.model("movie", movieSchema);
