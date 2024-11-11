import React from "react";
import { useProductContext } from "../Context/ProductContext";
import Filter from "../Filter/filter";
import "./searchbar.css";

const Searchbar = () => {
  const { updateSearchQuery, updateSortOption } = useProductContext();

  const handleSearchInput = (e) => {
    if (e.key === "Enter") {
      updateSearchQuery(e.target.value);
    }
  };

  const handleNameSortChange = (e) => {
    updateSortOption("name", e.target.value);
  };

  const handlePriceSortChange = (e) => {
    updateSortOption("price", e.target.value);
  };

  return (
    <div className="searchbar-container">
      <Filter
        Label="Sort by Name"
        options={["A-Z", "Z-A"]}
        id="filter-name"
        onChange={handleNameSortChange}
      />

      <Filter
        Label="Sort by Price"
        options={["Ascending", "Descending"]}
        id="filter-price"
        onChange={handlePriceSortChange}
      />

      <div className="search-input-container">
        <input
          id="search-input"
          type="text"
          className="search-input"
          placeholder="Search products..."
          onKeyDown={handleSearchInput}
        />
        <img src="/searchbar.svg" className="search-icon" alt="search-icon" />
      </div>
    </div>
  );
};

export default Searchbar;
