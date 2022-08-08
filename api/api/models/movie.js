//movie.js model file
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String },
  category: { type: String },
  movieDirector: { type: String },
  releaseDate: { type: String },
  averageRating: { type: Number },
});

module.exports = mongoose.model("movie", movieSchema);
