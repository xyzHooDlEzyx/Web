import React, { useState } from "react";
import { useProductContext } from "../Context/ProductContext";
import Card from "../card/card";
import Button from "../button/button";
import "./home.css";

const Home = () => {
  const { filteredProducts } = useProductContext();
  const [visibleProducts, setVisibleProducts] = useState(3);

  const loadMoreItems = () => setVisibleProducts((prev) => prev + 3);

  if (!Array.isArray(filteredProducts) || filteredProducts.length === 0) {
    return <p>Loading products...</p>;
  }

  return (
    <section className="home-section container">
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <img className="main" src="/main.jpg" alt="main" />
        </div>
        <div className="col-md-6">
          <h2>Check our new products</h2>
          <p>
            That have just arrived and are available for purchase right now.
          </p>
        </div>
      </div>

      <div className="card-row text-center">
        {filteredProducts.slice(0, visibleProducts).map((product) => (
          <div className="card-container" key={product.id}>
            <Card {...product} />
          </div>
        ))}
      </div>

      {visibleProducts < filteredProducts.length && (
        <div className="text-center mt-4">
          <Button onClick={loadMoreItems}>View More</Button>
        </div>
      )}
    </section>
  );
};

export default Home;
