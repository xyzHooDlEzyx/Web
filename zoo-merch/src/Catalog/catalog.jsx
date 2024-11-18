import "./catalog.css";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../api/productsApi";
import Card from "../card/card";
import Loading from "../Loading/loading";
import Searchbar from "../Searchbar/searchbar";

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleProductsUpdate = (updatedProducts) => {
    setProducts(updatedProducts);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="catalog-page">
      <Searchbar onProductsUpdate={handleProductsUpdate} />
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
