import React from "react";
import "./modal.css";
import axios from "axios";

function Modal({
  showModalRequestMessage,
  requestMessage,
  movieId,
  setMovieId,
  setShowModal,
  setRequestMessage,
  setShowModalRequestMessage,
  setDeleteModal,
  setEditModal,
  editMovieName,
  editMovieRating,
  editUserName,
  setEditMovieName,
  setEditMovieRating,
  setEditUserName,
  deleteModal,
  editModal,
  setRefreshMovieData,
}) {
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

  const handleCancelDeleteModal = () => {
    setMovieId("");
    setShowModal(false);
    setDeleteModal(false);
  };

  const handleCancelEditModal = () => {
    setMovieId("");
    setEditMovieName("");
    setEditMovieRating("");
    setEditUserName("");
    setShowModal(false);
    setEditModal(false);
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
          setShowModal(false);
          setEditModal(false);
          setRefreshMovieData((prev) => !prev);
        }, 2000);
      }
      requestMessage.values = { msg: "error try again later", type: "error" };
      setRequestMessage(requestMessage);
      setShowModalRequestMessage(true);
      setTimeout(() => {
        setShowModalRequestMessage(false);
        setMovieId("");
        setShowModal(false);
        setEditModal(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

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
          setShowModal(false);
          setDeleteModal(false);
          setRefreshMovieData((prev) => !prev);
        }, 2000);
      }
      requestMessage.values = { msg: "error try again later", type: "error" };
      setRequestMessage(requestMessage);
      setShowModalRequestMessage(true);
      setTimeout(() => {
        setShowModalRequestMessage(false);
        setMovieId("");
        setShowModal(false);
        setDeleteModal(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={"modal-container"}>
      <div className="modal">
        {showModalRequestMessage && (
          <div
            className={`modal-request-message ${requestMessage.values.type}`}
          >
            {requestMessage.values.msg}
          </div>
        )}
        {deleteModal && <h1>are you sure?</h1>}
        {editModal && (
          <div>
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
          </div>
        )}
        <div className="modal-btns">
          {deleteModal && (
            <button
              onClick={handleCancelDeleteModal}
              className="cancel-modal-btn"
            >
              cancel
            </button>
          )}
          {editModal && (
            <button
              onClick={handleCancelEditModal}
              className="cancel-modal-btn"
            >
              cancel
            </button>
          )}
          {deleteModal && (
            <button
              onClick={() => handleMovieDelete(movieId)}
              className="delete-modal-btn"
            >
              delete
            </button>
          )}
          {editModal && (
            <button
              onClick={() => handleMovieEdit(movieId)}
              className="edit-modal-btn"
            >
              update
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
