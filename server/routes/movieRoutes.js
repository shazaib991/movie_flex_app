const express = require("express");
const router = express.Router();
const dataStore = require("nedb");
const movies = new dataStore({
  filename: "./database/movies.db",
  autoload: true,
});

router.get("/", (req, res) => {
  try {
    movies.find({}, (err, data) => {
      if (err) {
        return res.status(500).json({ msg: err });
      }
      res.json(data);
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", (req, res) => {
  try {
    let uniqueMovieAndUserCheck = false;

    movies.find({}, (err, data) => {
      data.map((items) => {
        if (
          items.movieName.toLowerCase() === req.body.movieName.toLowerCase() &&
          items.userName.toLowerCase() === req.body.userName.toLowerCase()
        ) {
          uniqueMovieAndUserCheck = true;
        }
      });

      if (uniqueMovieAndUserCheck) {
        return res
          .status(200)
          .json({ msg: "same movie name and user not allowed" });
      }
      movies.insert(req.body, (err, data) => {
        if (err) {
          return res.status(500).json({ msg: err });
        }
        res.json({ msg: "movie added successfully", id: data._id });
      });
    });
  } catch (err) {
    console.log(err);
  }
});

router.patch("/:id", (req, res) => {
  try {
    movies.update(
      { _id: req.params.id },
      { $set: req.body },
      { upsert: false },
      (err, data) => {
        if (err) {
          return res.status(500).json({ msg: err });
        }
        res.json({ msg: "movie updated successfully" });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", (req, res) => {
  try {
    movies.remove({ _id: req.params.id }, (err, data) => {
      if (err) {
        return res.status(500).json({ msg: err });
      }
      res.json({ msg: "movie deleted successfully" });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
