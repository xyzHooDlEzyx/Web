import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../../api/productsApi";
import Loading from "../Loading/loading";
import Button from "../button/button";
import "./item.css";

const Item = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        const product = Array.isArray(data) && data.length > 0 ? data[0] : null;
        if (!product) {
          throw new Error("Product not found");
        }
        setTimeout(() => {
          setItem(product);
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error loading product:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error loading item: {error}</p>;
  }

  if (!item) {
    return <p>Item not found.</p>;
  }

  return (
    <div className="item-page">
      <div className="item-container">
        <div className="image-container">
          <img
            className="item-image"
            src={item.imgSrc}
            alt={item.alterText || "product"}
          />
        </div>

        <div className="desc-and-cart">
          <div className="proxy">
            <h2 className="item-title">{item.title}</h2>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>

          <p className="item-description">{item.description}</p>
          <p className="item-price">
            Price: ${parseFloat(item.price).toFixed(2)}
          </p>

          <Button>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default Item;
