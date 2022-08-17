import React from "react";
import "./movieSection.css";

function MovieSection() {
  return (
    <div className="movie-container">
      <div className="movie">
        <h1>movies</h1>
        <div className="movie-form-container">
          <div className="movie-form">
            <input type="text" placeholder="enter name of movie" />
            <select name="movie-rating" id="movie-rating">
              <option value="1"></option>
            </select>
            <input type="text" placeholder="enter your name" />
            <div className="movie-form-btn">
              <button>submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieSection;
