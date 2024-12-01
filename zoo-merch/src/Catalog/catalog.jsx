import "./catalog.css";
import React from "react";
import { useProductContext } from "../Context/ProductContext";
import Card from "../card/card";
import Searchbar from "../Searchbar/searchbar";

const Catalog = () => {
  const { filteredProducts } = useProductContext();

  return (
    <div className="catalog-page">
      <Searchbar />
      <div className="content-row text-center">
        {filteredProducts.map((product) => (
          <div className="card-container" key={product.id}>
            <Card {...product} type="full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
