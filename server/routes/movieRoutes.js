const express = require("express");
const router = express.Router();
const dataStore = require("nedb");
const movies = new dataStore({
  filename: "./database/movies.db",
  autoload: true,
});

router.get("/", (req, res) => {
  movies.find({}, (err, data) => {
    if (err) {
      return res.status(500).json({ msg: err });
    }
    res.json(data);
  });
});

router.post("/", (req, res) => {
  try {
    movies.insert(req.body, (err, data) => {
      if (err) {
        return res.status(500).json({ msg: err });
      }
      res.json({ msg: "movie added successfully", id: data._id });
    });
  } catch (err) {
    return res.status(500).json({ msg: err });
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
    return res.status(500).json({ msg: err });
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
    return res.status(500).json({ msg: err });
  }
});

module.exports = router;
