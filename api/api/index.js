const express = require("express");
const router = express.Router();

require("./routes/rating")(router);
require("./routes/movie")(router);

module.exports = router;
