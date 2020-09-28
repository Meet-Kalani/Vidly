const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 50
  }
});

module.exports.genres = mongoose.model("genre", genreSchema);
module.exports.genreSchema = genreSchema;
