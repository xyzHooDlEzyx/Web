import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loadProducts } from "../store/actions/productActions";
import Filter from "../Filter/filter";
import "./searchbar.css";

const Searchbar = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const handleSearchInput = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(e.target.value);
      dispatch(loadProducts(searchQuery, sortOption, filterOption));
    }
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    dispatch(loadProducts(searchQuery, value, filterOption));
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterOption(value);
    dispatch(loadProducts(searchQuery, sortOption, value));
  };

  return (
    <div className="searchbar-container">
      <Filter
        Label="Sorting"
        options={["A-Z", "Z-A", "Price Asc", "Price Desc"]}
        id="sorting"
        onChange={handleSortChange}
      />
      <Filter
        Label="Filters"
        options={[">10$", "10$>x>20$", ">15$"]}
        id="filter"
        onChange={handleFilterChange}
      />
      <div className="search-input-container">
        <input
          id="search-input"
          type="text"
          className="search-input"
          placeholder="Search products..."
          onKeyDown={handleSearchInput}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <img src="/searchbar.svg" className="search-icon" alt="search-icon" />
      </div>
    </div>
  );
};

export default Searchbar;
