const Movie = require("../models/movie");
module.exports = function (router) {
  //getAll
  router.get("/movie", (req, res) => {
    var query = Movie.find({});
    query.exec(function (err, data) {
      if (err) {
        res.json(err);
      }
      res.json(data);
    });
  });

  //add
  router.post("/movie", (req, res) => {
    let note = new Movie(req.body);
    note.save(function (err, note) {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(note);
    });
  });

  //findById
  router.get("/movie/:id", (req, res) => {
    let id = req.params.id;
    Movie.findById(id, function (err, data) {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(data);
    });
  });

  //deleteById
  router.delete("/movie/:id", (req, res) => {
    let id = req.params.id;
    console.log("delete api called and id : " + id);
    Movie.findByIdAndRemove(id, function (err, data) {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(data);
    });
  });
};
