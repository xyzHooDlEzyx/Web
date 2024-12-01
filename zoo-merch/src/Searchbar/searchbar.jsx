import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../api/productsApi";
import Filter from "../Filter/filter";
import "./searchbar.css";

const Searchbar = ({ onProductsUpdate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const fetchFilteredProducts = async () => {
    try {
      const products = await fetchProducts(
        searchQuery,
        sortOption,
        filterOption
      );
      onProductsUpdate(products);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [searchQuery, sortOption, filterOption]);

  const handleSearchInput = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(e.target.value);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
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
        />
        <img src="/searchbar.svg" className="search-icon" alt="search-icon" />
      </div>
    </div>
  );
};

export default Searchbar;
