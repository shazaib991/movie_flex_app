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
      return res.status(500).json({ msg: "something went wrong" });
    }
    res.json(data);
  });
});

router.post("/", (req, res) => {
  try {
    movies.insert(req.body, (err, data) => {
      if (err) {
        return res.status(500).json({ msg: "something went wrong" });
      }
      res.json({ msg: "movie added successfully" });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
