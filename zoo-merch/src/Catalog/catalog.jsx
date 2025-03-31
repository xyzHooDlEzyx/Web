import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../store/actions/productActions";
import Card from "../Card/card";
import Loading from "../Loading/loading";
import Searchbar from "../Searchbar/searchbar";
import "./catalog.css";

const Catalog = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.products);
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

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="catalog-page">
      <Searchbar />
      <div className="content-row text-center">
        {products.map((product) => (
          <div className="card-container" key={product.id}>
            <Card {...product} type="full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
