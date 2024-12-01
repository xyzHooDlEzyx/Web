import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../store/actions/productActions";
import Card from "../Card/card";
import Button from "../button/button";
import Loading from "../Loading/loading";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.products);
  const [visibleProducts, setVisibleProducts] = useState(3);
  const [isTimeoutLoading, setIsTimeoutLoading] = useState(true);

  useEffect(() => {
    dispatch(loadProducts());

    const timeout = setTimeout(() => {
      setIsTimeoutLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [dispatch]);

  if (isLoading || isTimeoutLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

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
