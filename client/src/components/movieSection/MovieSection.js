import React, { useEffect, useState } from "react";
import "./movieSection.css";
import axios from "axios";
import MovieForm from "../movieForm/MovieForm";
import MoviePagination from "../moviePagination/MoviePagination";
import MovieTable from "../movieTable/MovieTable";
import AverageMovieRating from "../averageMovieRating/AverageMovieRating";

function MovieSection() {
  const [requestMessage, setRequestMessage] = useState({});
  const [showRequestMessage, setShowRequestMessage] = useState(false);
  const [movieData, setMovieData] = useState([]);
  const [paginationMovieData, setPaginationMovieData] = useState([]);
  const [currentMoviePage, setCurrentMoviePage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(5);
  const [moviePageNumbers, setMoviePageNumbers] = useState([]);
  const [refreshMovieData, setRefreshMovieData] = useState(false);

  const fetchMovieData = async () => {
    try {
      const response = await axios.get(
        "https://movie-flex-table.herokuapp.com/api/v1/movies"
      );
      const movies = response.data;

      setMovieData(movies);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, [refreshMovieData]);

  useEffect(() => {
    const indexOfLastMovie = currentMoviePage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const pageArray = [];

    for (let i = 1; i <= Math.ceil(movieData.length / moviesPerPage); i++) {
      pageArray.push(i);
    }
    setMoviePageNumbers(pageArray);
    setPaginationMovieData(
      movieData.slice(indexOfFirstMovie, indexOfLastMovie)
    );
  }, [moviesPerPage, currentMoviePage, movieData]);

  return (
    <div className="movie-container">
      <div className="movie">
        <h1>movies</h1>
        <MovieForm
          requestMessage={requestMessage}
          showRequestMessage={showRequestMessage}
          setRequestMessage={setRequestMessage}
          setShowRequestMessage={setShowRequestMessage}
          setRefreshMovieData={setRefreshMovieData}
        />
        {movieData.length !== 0 ? (
          <div className="movie-list">
            <MovieTable
              paginationMovieData={paginationMovieData}
              movieData={movieData}
              requestMessage={requestMessage}
              setRequestMessage={setRequestMessage}
              setRefreshMovieData={setRefreshMovieData}
            />
            <MoviePagination
              currentMoviePage={currentMoviePage}
              setCurrentMoviePage={setCurrentMoviePage}
              moviePageNumbers={moviePageNumbers}
              moviesPerPage={moviesPerPage}
              setMoviesPerPage={setMoviesPerPage}
            />
            <AverageMovieRating />
          </div>
        ) : (
          <h1>no movies added yet</h1>
        )}
      </div>
    </div>
  );
}

export default MovieSection;
