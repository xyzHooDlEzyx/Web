import React, { createContext, useState, useContext, useEffect } from "react";
import data from "../Data/data";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products] = useState(data); // Initial product data
  const [filteredProducts, setFilteredProducts] = useState(data); // State for filtered and sorted products
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState({ name: "", price: "" });

  // Function to apply filters and sorting based on the current searchQuery and sortOption
  const applyFiltersAndSort = () => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by name
    if (sortOption.name === "A-Z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption.name === "Z-A") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    // Sort by price
    if (sortOption.price === "Ascending") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption.price === "Descending") {
      result.sort((a, b) => b.price - a.price);
    }

    // Update the filtered products
    setFilteredProducts(result);
  };

  // Update the search query and let useEffect handle applying filters/sorting
  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  // Update the sorting option and let useEffect handle applying filters/sorting
  const updateSortOption = (type, value) => {
    setSortOption((prev) => ({ ...prev, [type]: value }));
  };

  // Re-apply filters and sorting when searchQuery or sortOption changes
  useEffect(() => {
    applyFiltersAndSort();
  }, [searchQuery, sortOption, products]); // Include products in dependency array in case it changes
  console.log("Products in Provider:", products);

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        updateSearchQuery,
        updateSortOption,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
