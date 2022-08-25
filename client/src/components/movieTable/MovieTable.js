import React, { useState } from "react";
import editIcon from "../../icons/icons8-edit-384.png";
import deleteIcon from "../../icons/icons8-delete-144.png";
import Modal from "../modal/Modal";
import MovieSearchAndSort from "../movieSearchAndSort/MovieSearchAndSort";
import "./movieTable.css";

function MovieTable({
  paginationMovieData,
  movieData,
  requestMessage,
  setRequestMessage,
  setRefreshMovieData,
}) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [movieId, setMovieId] = useState("");
  const [editUserName, setEditUserName] = useState("");
  const [editMovieName, setEditMovieName] = useState("");
  const [editMovieRating, setEditMovieRating] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [showModalRequestMessage, setShowModalRequestMessage] = useState(false);

  const handleDeleteModal = (movieId) => {
    setMovieId(movieId);
    setDeleteModal(true);
    setShowModal(true);
  };

  const handleEditModal = (movieId) => {
    setMovieId(movieId);
    const selectedMovieData = movieData.filter((item) => item._id === movieId);
    setEditMovieName(selectedMovieData[0].movieName);
    setEditMovieRating(selectedMovieData[0].movieRating);
    setEditUserName(selectedMovieData[0].userName);
    setEditModal(true);
    setShowModal(true);
  };

  return (
    <>
      <MovieSearchAndSort
        search={search}
        sort={sort}
        setSearch={setSearch}
        setSort={setSort}
      />
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
                  item.userName.toLowerCase().includes(search.toLowerCase())
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
        {showModal && (
          <Modal
            showModalRequestMessage={showModalRequestMessage}
            setShowModalRequestMessage={setShowModalRequestMessage}
            requestMessage={requestMessage}
            setRequestMessage={setRequestMessage}
            movieId={movieId}
            deleteModal={deleteModal}
            editModal={editModal}
            setShowModal={setShowModal}
            setMovieId={setMovieId}
            setDeleteModal={setDeleteModal}
            setEditModal={setEditModal}
            editUserName={editUserName}
            editMovieName={editMovieName}
            editMovieRating={editMovieRating}
            setEditMovieName={setEditMovieName}
            setEditMovieRating={setEditMovieRating}
            setEditUserName={setEditUserName}
            setRefreshMovieData={setRefreshMovieData}
          />
        )}
      </div>
    </>
  );
}

export default MovieTable;
