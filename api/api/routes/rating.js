const Rating = require("../models/rating");
const Movie = require("../models/movie");

module.exports = function (router) {
  //getAll
  router.get("/rating", (req, res) => {
    var query = Rating.find({});
    query.exec(function (err, data) {
      if (err) {
        res.json(err);
      }
      res.json(data);
    });
  });

  //add
  router.post("/rating", (req, res) => {
    let rating = new Rating(req.body);
    rating.save(function (err, rating) {
      if (err) {
        res.status(400).json(err);
      }
      try {
        let movieid = rating.movieId;
        Rating.find({ movieId: movieid }).exec(function (err, data) {
          if (err) {
            res.json(err);
          }
          var ratingCount = 0;
          for (const item of data) {
            ratingCount += item.rating;
          }
          average = ratingCount / data.length;

          Movie.findOneAndUpdate(
            { _id: movieid },
            { averageRating: isNaN(average) ? 0 : average },
            {
              new: true,
            }
          ).exec(function (err, data) {
            if (err) {
              console.log("Movieerr", err);
            }
            // res.json(data);
          });
        });
      } catch (error) {
        console.log("error", error);
      }

      res.status(200).json(rating);
    });
  });

  router.put("/rating", (req, res) => {
    // var id = req.id;
    // console.log("id", id);
    let rating = new Rating(req.body);
    console.log("rating", rating);
    console.log(" rating._id", rating._id);

    Rating.findOneAndUpdate(
      { _id: rating._id },
      { rating: rating.rating }
    ).exec(function (err, rating) {
      if (err) {
        res.status(400).json(err);
      }
      try {
        let movieid = rating.movieId;
        Rating.find({ movieId: movieid }).exec(function (err, data) {
          if (err) {
            res.json(err);
          }
          var ratingCount = 0;
          for (const item of data) {
            ratingCount += item.rating;
          }
          average = ratingCount / data.length;

          Movie.findOneAndUpdate(
            { _id: movieid },
            { averageRating: isNaN(average) ? 0 : average },
            {
              new: true,
            }
          ).exec(function (err, data) {
            if (err) {
              console.log("Movieerr", err);
            }
            // res.json(data);
          });
        });
      } catch (error) {
        console.log("error", error);
      }

      res.status(200).json(rating);
    });
  });
  // //findById
  // router.get("/rating/:id", (req, res) => {
  //   let id = req.params.ratingID;
  //   Rating.findById(id, function (err, data) {
  //     if (err) {
  //       res.status(400).json(err);
  //     }
  //     res.status(200).json(data);
  //   });
  // });

  //findByMovieIdAndUserid
  router.get("/rating/:movieid/:userid", (req, res) => {
    let movieid = req.params.movieid;
    let userId = req.params.userid;
    Rating.find({ movieId: movieid, userId: userId }, function (err, data) {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(data);
    });
  });

  //findByMovieId
  router.get("/rating/:movieid", (req, res) => {
    let movieid = req.params.movieid;
    Rating.find({ movieId: movieid }, function (err, data) {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(data);
    });
  });

  //deleteById
  router.delete("/rating/:id", (req, res) => {
    let id = req.params.id;
    console.log("delete api called and id : " + id);
    Rating.findByIdAndRemove(id, function (err, data) {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json(data);
    });
  });

  function getById(id) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(url);
      try {
        await client.connect();
        const db = client.db(dbName);
        const item = await db
          .collection("newspapers")
          .findOne({ _id: ObjectID(id) });
        resolve(item);
        client.close();
      } catch (error) {
        reject(error);
      }
    });
  }
};
