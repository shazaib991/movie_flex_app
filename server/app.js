const movieRouter = require("./routes/movieRoutes");
const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>movies api</h1>");
});

app.use("/api/v1/movies", movieRouter);

app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});
