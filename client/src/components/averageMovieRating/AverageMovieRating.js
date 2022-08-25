import axios from "axios";
import React, { useState } from "react";
import "./averageMovieRating.css";

function AverageMovieRating() {
  const [averageMovieRating, setAverageMovieRating] = useState("");
  const [averageMovieRatingResult, setAverageMovieRatingResult] = useState("");

  const handleAverageMovieRatingChange = (e) => {
    setAverageMovieRating(e.target.value);
  };

  const handleAverageMovieRating = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/movies/averageRating",
        { movieName: averageMovieRating }
      );

      if (response.status === 200) {
        setAverageMovieRatingResult(response.data.averageMovieRating);
        if (response.data.averageMovieRating === null) {
          setAverageMovieRatingResult("movie not found");
          return;
        }
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="movie-average-rating">
      <div className="movie-average-rating-input">
        <input
          type="text"
          placeholder="enter movie name for average rating"
          value={averageMovieRating}
          onChange={handleAverageMovieRatingChange}
        />
        <button onClick={handleAverageMovieRating}>submit</button>
      </div>
      {averageMovieRatingResult && (
        <p>average rating: {averageMovieRatingResult}</p>
      )}
    </div>
  );
}

export default AverageMovieRating;
