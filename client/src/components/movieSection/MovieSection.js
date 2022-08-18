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
              <option value="rate this movie" disabled>
                rate this movie
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <input type="text" placeholder="enter your name" />
            <div className="movie-form-btn">
              <button>submit</button>
            </div>
          </div>
        </div>
        <div className="movie-list">
          <div className="movie-list-search-sort">
            <input type="text" placeholder="search" />
            <select name="sort" id="sort">
              <option value="userName">user name</option>
              <option value="movieName">movie name</option>
              <option value="movieRating">movie rating</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieSection;
