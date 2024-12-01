import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../api/productsApi";
import Card from "../card/card";
import Button from "../button/button";
import Loading from "../Loading/loading";
import "./home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [visibleProducts, setVisibleProducts] = useState(3);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setTimeout(() => {
          setProducts(data);
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error loading products:", error);
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) return <Loading />;

  const loadMoreItems = () => setVisibleProducts((prev) => prev + 3);

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
        {products.slice(0, visibleProducts).map((product) => (
          <div className="card-container" key={product.id}>
            <Card {...product} />
          </div>
        ))}
      </div>

      {visibleProducts < products.length && (
        <div className="text-center mt-4">
          <Button onClick={loadMoreItems}>View More</Button>
        </div>
      )}
    </section>
  );
};

export default Home;
