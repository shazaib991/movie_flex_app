import React from "react";
import "./movieSearchAndSort.css";

function MovieSearchAndSort({ search, sort, setSearch, setSort }) {
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    if (e.target.value === "sort") {
      return;
    }
    setSort(e.target.value);
  };

  return (
    <div className="movie-list-search-sort">
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={handleSearchChange}
      />
      <select name="sort" id="sort" value={sort} onChange={handleSortChange}>
        <option>sort</option>
        <option value="userName">user name</option>
        <option value="movieName">movie name</option>
        <option value="movieRating">movie rating</option>
        <option value="noSort">no sort</option>
      </select>
    </div>
  );
}

export default MovieSearchAndSort;
