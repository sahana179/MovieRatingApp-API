//rating.js model file
const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  rating: { type: Number },
  commentContent: { type: String },
  commentTitle: { type: String },
  userId: { type: String },
  movieId: { type: String },
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("rating", ratingSchema);
