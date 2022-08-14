const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("<h1>movies api</h1>");
});

app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});
