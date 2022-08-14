const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "test" });
});

router.post("/", (req, res) => {
  res.status(201).json({ msg: req.body });
});

module.exports = router;
