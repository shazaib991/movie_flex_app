import React, { useEffect, useState } from "react";
import "./movieSection.css";
import editIcon from "../../icons/icons8-edit-384.png";
import deleteIcon from "../../icons/icons8-delete-144.png";
import axios from "axios";

function MovieSection() {
  const [userName, setUserName] = useState("");
  const [movieName, setMovieName] = useState("");
  const [movieRating, setMovieRating] = useState("");
  const [editUserName, setEditUserName] = useState("");
  const [editMovieName, setEditMovieName] = useState("");
  const [editMovieRating, setEditMovieRating] = useState("");
  const [requestMessage, setRequestMessage] = useState({});
  const [showRequestMessage, setShowRequestMessage] = useState(false);
  const [showModalRequestMessage, setShowModalRequestMessage] = useState(false);
  const [movieData, setMovieData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [movieId, setMovieId] = useState("");

  const handleMovieNameChange = (e) => {
    setMovieName(e.target.value);
  };

  const handleMovieRatingChange = (e) => {
    setMovieRating(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEditMovieNameChange = (e) => {
    setEditMovieName(e.target.value);
  };

  const handleEditMovieRatingChange = (e) => {
    setEditMovieRating(e.target.value);
  };

  const handleEditUserNameChange = (e) => {
    setEditUserName(e.target.value);
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
      const response = await axios.post("http://localhost:5000/api/v1/movies", {
        movieName,
        movieRating,
        userName,
      });
      if (response.status === 200) {
        requestMessage.values = {
          msg: "successfully submited",
          type: "success",
        };
        setRequestMessage(requestMessage);
        setShowRequestMessage(true);
        setMovieName("");
        setMovieRating("");
        setUserName("");
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
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovieData = async () => {
    const response = await axios.get("http://localhost:5000/api/v1/movies");
    const movies = response.data;

    setMovieData(movies);
  };

  useEffect(() => {
    fetchMovieData();
  }, [movieData]);

  const handleMovieDelete = async (movieId) => {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/movies/${movieId}`
    );

    if (response.status === 200) {
      setShowDeleteModal(false);
      setMovieId("");
    }
  };

  const handleMovieEdit = async (movieId) => {
    const response = await axios.patch(
      `http://localhost:5000/api/v1/movies/${movieId}`,
      {
        movieName: editMovieName,
        movieRating: editMovieRating,
        userName: editUserName,
      }
    );

    if (response.status === 200) {
      requestMessage.values = { msg: "successfully updated", type: "success" };
      setRequestMessage(requestMessage);
      setShowModalRequestMessage(true);
      setTimeout(() => {
        setShowRequestMessage(false);
        setShowEditModal(false);
      }, 2000);
      setMovieId("");
    }
  };

  const handleDeleteModal = (movieId) => {
    setMovieId(movieId);
    setShowDeleteModal(true);
  };

  const handleEditModal = (movieId) => {
    setMovieId(movieId);
    const selectedMovieData = movieData.filter((item) => item._id === movieId);
    setEditMovieName(selectedMovieData[0].movieName);
    setEditMovieRating(selectedMovieData[0].movieRating);
    setEditUserName(selectedMovieData[0].userName);
    setShowEditModal(true);
  };

  const handleCancelDeleteModal = () => {
    setMovieId("");
    setShowDeleteModal(false);
  };

  const handleCancelEditModal = () => {
    setMovieId("");
    setEditMovieName("");
    setEditMovieRating("");
    setEditUserName("");
    setShowEditModal(false);
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
              <option value="rate this movie">rate this movie</option>
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
              {showRequestMessage && (
                <div
                  className={`request-message ${requestMessage.values.type}`}
                >
                  {requestMessage.values.msg}
                </div>
              )}
              <button onClick={handleSubmit}>submit</button>
            </div>
          </div>
        </div>
        {movieData.length !== 0 ? (
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
                  {movieData.map((items) => {
                    return (
                      <tr key={items._id}>
                        <td>{items.movieName}</td>
                        <td>{items.movieRating}</td>
                        <td>{items.userName}</td>
                        <td>
                          <img
                            src={editIcon}
                            alt="edit"
                            onClick={() => handleEditModal(items._id)}
                          />
                          <img
                            src={deleteIcon}
                            alt="edit"
                            onClick={() => handleDeleteModal(items._id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
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
        ) : (
          <h1>no movies added yet</h1>
        )}
      </div>
      {showDeleteModal && (
        <div className={"delete-modal-container"}>
          <div className="delete-modal">
            {showModalRequestMessage && (
              <div
                className={`modal-request-message ${requestMessage.values.type}`}
              >
                {requestMessage.values.msg}
              </div>
            )}
            <h1>are you sure?</h1>
            <div className="delete-modal-btns">
              <button onClick={handleCancelDeleteModal}>cancel</button>
              <button onClick={() => handleMovieDelete(movieId)}>delete</button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className={"edit-modal-container"}>
          <div className="edit-modal">
            {showModalRequestMessage && (
              <div
                className={`modal-request-message ${requestMessage.values.type}`}
              >
                {requestMessage.values.msg}
              </div>
            )}
            <input
              type="text"
              placeholder="enter name of movie"
              value={editMovieName}
              onChange={handleEditMovieNameChange}
            />
            <select
              name="movie-rating"
              id="movie-rating"
              value={editMovieRating}
              onChange={handleEditMovieRatingChange}
            >
              <option value="rate this movie">rate this movie</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <input
              type="text"
              placeholder="enter your name"
              value={editUserName}
              onChange={handleEditUserNameChange}
            />
            <div className="edit-modal-btns">
              <button onClick={handleCancelEditModal}>cancel</button>
              <button onClick={() => handleMovieEdit(movieId)}>update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieSection;
