import React, { createContext, useState, useContext, useEffect } from "react";
import data from "../Data/data";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products] = useState(data);
  const [filteredProducts, setFilteredProducts] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState({ name: "", price: "" });

  const applyFiltersAndSort = () => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption.name === "A-Z") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption.name === "Z-A") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (sortOption.price === "Ascending") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption.price === "Descending") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  };

  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const updateSortOption = (type, value) => {
    setSortOption((prev) => ({ ...prev, [type]: value }));
  };

  useEffect(() => {
    applyFiltersAndSort();
  }, [searchQuery, sortOption, products]);

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
