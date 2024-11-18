import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../api/productsApi";
import Filter from "../Filter/filter";
import "./searchbar.css";

const Searchbar = ({ onProductsUpdate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  const fetchFilteredProducts = async () => {
    try {
      const products = await fetchProducts(searchQuery, sortOption);
      onProductsUpdate(products);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [searchQuery, sortOption]);

  const handleSearchInput = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(e.target.value);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="searchbar-container">
      <Filter
        Label="Filters"
        options={["A-Z", "Z-A", "Price Asc", "Price Desc"]}
        id="filter"
        onChange={handleSortChange}
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
