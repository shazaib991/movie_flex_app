import axios from "axios";
import React, { useState } from "react";
import "./movieForm.css";

function MovieForm({
  showRequestMessage,
  requestMessage,
  setRequestMessage,
  setShowRequestMessage,
  setRefreshMovieData,
}) {
  const [userName, setUserName] = useState("");
  const [movieName, setMovieName] = useState("");
  const [movieRating, setMovieRating] = useState("");

  const handleMovieNameChange = (e) => {
    setMovieName(e.target.value);
  };

  const handleMovieRatingChange = (e) => {
    if (e.target.value > 5 || (e.target.value < 1 && movieRating === "")) {
      return;
    }
    setMovieRating(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async () => {
    if (movieName === "" || movieRating === "" || userName === "") {
      requestMessage.values = { msg: "please enter values", type: "warning" };
      setRequestMessage(requestMessage);
      setShowRequestMessage(true);
      return setTimeout(() => {
        setShowRequestMessage(false);
      }, 2000);
    }
    try {
      const response = await axios.post(
        "https://movie-flex-table.herokuapp.com/api/v1/movies",
        {
          movieName,
          movieRating,
          userName,
        }
      );
      if (response.data.msg === "movie added successfully") {
        requestMessage.values = {
          msg: "successfully submited",
          type: "success",
        };
        setRequestMessage(requestMessage);
        setShowRequestMessage(true);
        setMovieName("");
        setMovieRating("");
        setUserName("");
        setRefreshMovieData((prev) => !prev);
        return setTimeout(() => {
          setShowRequestMessage(false);
        }, 2000);
      }
      if (response.data.msg === "same movie name and user not allowed") {
        requestMessage.values = {
          msg: "same movie name with user not allowed",
          type: "warning",
        };
        setRequestMessage(requestMessage);
        setShowRequestMessage(true);
        return setTimeout(() => {
          setShowRequestMessage(false);
        }, 2000);
      }
      requestMessage.values = { msg: "error try again later", type: "error" };
      setRequestMessage(requestMessage);
      setShowRequestMessage(true);
      setTimeout(() => {
        setShowRequestMessage(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="movie-form-container">
      <div className="movie-form">
        <input
          type="text"
          placeholder="enter name of movie"
          value={movieName}
          onChange={handleMovieNameChange}
        />
        <input
          type="text"
          placeholder="enter movie rating"
          value={movieRating}
          onChange={handleMovieRatingChange}
        />
        <input
          type="text"
          placeholder="enter your name"
          value={userName}
          onChange={handleUserNameChange}
        />
        <div className="movie-form-btn">
          {showRequestMessage && (
            <div className={`request-message ${requestMessage.values.type}`}>
              {requestMessage.values.msg}
            </div>
          )}
          <button onClick={handleSubmit}>submit</button>
        </div>
      </div>
    </div>
  );
}

export default MovieForm;
