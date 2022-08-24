import React, { useCallback, useEffect, useState } from "react";
import "./movieSection.css";
import editIcon from "../../icons/icons8-edit-384.png";
import deleteIcon from "../../icons/icons8-delete-144.png";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
  const [paginationMovieData, setPaginationMovieData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [movieId, setMovieId] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [averageMovieRating, setAverageMovieRating] = useState("");
  const [averageMovieRatingResult, setAverageMovieRatingResult] = useState("");
  const [currentMoviePage, setCurrentMoviePage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(5);
  const [moviePageNumbers, setMoviePageNumbers] = useState([]);

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

  const handleEditMovieNameChange = (e) => {
    setEditMovieName(e.target.value);
  };

  const handleEditMovieRatingChange = (e) => {
    if (e.target.value > 5 || (e.target.value < 1 && editMovieRating === "")) {
      return;
    }
    setEditMovieRating(e.target.value);
  };

  const handleEditUserNameChange = (e) => {
    setEditUserName(e.target.value);
  };

  const handleAverageMovieRatingChange = (e) => {
    setAverageMovieRating(e.target.value);
  };

  const handlePaginationNavigation = (e) => {
    setCurrentMoviePage(Number(e.target.innerText));
  };

  const handleMoviesPerPageChange = (e) => {
    if (e.target.value === "movies per page") {
      return;
    }
    setMoviesPerPage(Number(e.target.value));
  };

  const handleSortChange = (e) => {
    if (e.target.value === "sort") {
      return;
    }
    setSort(e.target.value);
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

  const fetchMovieData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/movies");
      const movies = response.data;

      const indexOfLastMovie = currentMoviePage * moviesPerPage;
      const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
      setMovieData(movies);
      setPaginationMovieData(movies.slice(indexOfFirstMovie, indexOfLastMovie));
    } catch (err) {
      console.log(err);
    }
  }, [currentMoviePage, moviesPerPage]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData, movieData]);

  const handleMovieDelete = async (movieId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/movies/${movieId}`
      );

      if (response.status === 200) {
        requestMessage.values = {
          msg: "successfully deleted",
          type: "success",
        };
        setRequestMessage(requestMessage);
        setShowModalRequestMessage(true);
        return setTimeout(() => {
          setShowModalRequestMessage(false);
          setMovieId("");
          setShowDeleteModal(false);
        }, 2000);
      }
      requestMessage.values = { msg: "error try again later", type: "error" };
      setRequestMessage(requestMessage);
      setShowModalRequestMessage(true);
      setTimeout(() => {
        setShowModalRequestMessage(false);
        setMovieId("");
        setShowDeleteModal(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMovieEdit = async (movieId) => {
    if (editMovieName === "" || editMovieRating === "" || editUserName === "") {
      requestMessage.values = { msg: "please enter values", type: "warning" };
      setRequestMessage(requestMessage);
      setShowModalRequestMessage(true);
      return setTimeout(() => {
        setShowModalRequestMessage(false);
      }, 2000);
    }

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/movies/${movieId}`,
        {
          movieName: editMovieName,
          movieRating: editMovieRating,
          userName: editUserName,
        }
      );

      if (response.status === 200) {
        requestMessage.values = {
          msg: "successfully updated",
          type: "success",
        };
        setRequestMessage(requestMessage);
        setShowModalRequestMessage(true);
        return setTimeout(() => {
          setShowModalRequestMessage(false);
          setMovieId("");
          setShowEditModal(false);
        }, 2000);
      }
      requestMessage.values = { msg: "error try again later", type: "error" };
      setRequestMessage(requestMessage);
      setShowModalRequestMessage(true);
      setTimeout(() => {
        setShowModalRequestMessage(false);
        setMovieId("");
        setShowEditModal(false);
      }, 2000);
    } catch (err) {
      console.log(err);
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

  const downloadMoviesPdf = () => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: "#movie-table" });
    pdf.save("Movies.pdf");
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
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

  useEffect(() => {
    const pageArray = [];

    for (let i = 1; i <= Math.ceil(movieData.length / moviesPerPage); i++) {
      pageArray.push(i);
    }
    setMoviePageNumbers(pageArray);
  }, [movieData, moviesPerPage]);

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
              <input
                type="text"
                placeholder="search"
                value={search}
                onChange={handleSearchChange}
              />
              <select
                name="sort"
                id="sort"
                value={sort}
                onChange={handleSortChange}
              >
                <option>sort</option>
                <option value="userName">user name</option>
                <option value="movieName">movie name</option>
                <option value="movieRating">movie rating</option>
                <option value="noSort">no sort</option>
              </select>
            </div>
            <div className="movie-list-table">
              <table id="movie-table">
                <thead>
                  <tr>
                    <th>movie name</th>
                    <th>movie rating</th>
                    <th>user name</th>
                    <th>actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginationMovieData
                    .filter((item) => {
                      if (
                        (search !== "" &&
                          item.movieName
                            .toLowerCase()
                            .includes(search.toLowerCase())) ||
                        item.movieRating === search ||
                        item.userName
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return item;
                      }
                      return false;
                    })
                    .sort((a, b) => {
                      if (sort === "movieName") {
                        return a.movieName > b.movieName ? 1 : -1;
                      }
                      if (sort === "movieRating") {
                        return a.movieRating > b.movieRating ? 1 : -1;
                      }
                      if (sort === "userName") {
                        return a.userName > b.userName ? 1 : -1;
                      }
                      if (sort === "noSort") {
                        return false;
                      }
                      return false;
                    })
                    .map((items) => {
                      return (
                        <tr key={items._id}>
                          <td data-label="movie name">{items.movieName}</td>
                          <td data-label="movie rating">{items.movieRating}</td>
                          <td data-label="user name">{items.userName}</td>
                          <td data-label="actions">
                            <img
                              src={editIcon}
                              alt="edit"
                              onClick={() => handleEditModal(items._id)}
                            />
                            <img
                              src={deleteIcon}
                              alt="delete"
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
                {moviePageNumbers.map((number) => {
                  return (
                    <div
                      key={number}
                      className={`movie-pagination-navigators ${
                        number === currentMoviePage && "active"
                      }`}
                      onClick={handlePaginationNavigation}
                    >
                      {number}
                    </div>
                  );
                })}
              </div>
              <div className="movie-pagination-movies-per-page">
                <select
                  name="pagination"
                  id="pagination"
                  value={moviesPerPage}
                  onChange={handleMoviesPerPageChange}
                >
                  <option value="movies per page">movies per page</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </div>
              <button onClick={downloadMoviesPdf}>Download PDF</button>
            </div>
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
            <input
              type="text"
              placeholder="enter movie rating"
              value={editMovieRating}
              onChange={handleEditMovieRatingChange}
            />
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
