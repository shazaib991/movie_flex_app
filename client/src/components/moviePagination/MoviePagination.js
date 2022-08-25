import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./moviePagination.css";

function MoviePagination({
  currentMoviePage,
  setCurrentMoviePage,
  moviePageNumbers,
  moviesPerPage,
  setMoviesPerPage,
}) {
  const handlePaginationNavigation = (e) => {
    setCurrentMoviePage(Number(e.target.innerText));
  };

  const handleMoviesPerPageChange = (e) => {
    if (e.target.value === "movies per page") {
      return;
    }
    setMoviesPerPage(Number(e.target.value));
  };

  const downloadMoviesPdf = () => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: "#movie-table" });
    pdf.save("Movies.pdf");
  };

  return (
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
  );
}

export default MoviePagination;
