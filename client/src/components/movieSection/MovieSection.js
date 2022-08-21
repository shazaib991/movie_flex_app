import React, { useState } from "react";
import "./movieSection.css";
import editIcon from "../../icons/icons8-edit-384.png";
import deleteIcon from "../../icons/icons8-delete-144.png";

function MovieSection() {
  const [userName, setUserName] = useState("");
  const [movieName, setMovieName] = useState("");
  const [movieRating, setMovieRating] = useState("");

  const handleMovieNameChange = (e) => {
    setMovieName(e.target.value);
  };

  const handleMovieRatingChange = (e) => {
    setMovieRating(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <div className="movie-container">
      <div className="movie">
        <h1>movies</h1>
        <div className="movie-form-container">
          <div className="movie-form">
            <input
              type="text"
              placeholder="enter name of movie"
              value={movieName}
              onChange={handleMovieNameChange}
            />
            <select
              name="movie-rating"
              id="movie-rating"
              value={movieRating}
              onChange={handleMovieRatingChange}
            >
              <option value="rate this movie" disabled>
                rate this movie
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <input
              type="text"
              placeholder="enter your name"
              value={userName}
              onChange={handleUserNameChange}
            />
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
          <div className="movie-list-table">
            <table>
              <thead>
                <tr>
                  <th>movie name</th>
                  <th>movie rating</th>
                  <th>user name</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>movie 1</td>
                  <td>4</td>
                  <td>user 1</td>
                  <td>
                    <img src={editIcon} alt="edit" />
                    <img src={deleteIcon} alt="edit" />
                  </td>
                </tr>
                <tr>
                  <td>movie 2</td>
                  <td>5</td>
                  <td>user 2</td>
                  <td>
                    <img src={editIcon} alt="edit" />
                    <img src={deleteIcon} alt="edit" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="movie-pagination">
            <div className="movie-pagination-navigators-container">
              <div className="movie-pagination-navigators active">1</div>
              <div className="movie-pagination-navigators">2</div>
              <div className="movie-pagination-navigators">3</div>
              <div className="movie-pagination-navigators">4</div>
              <div className="movie-pagination-navigators">5</div>
            </div>
            <button>Download PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieSection;
