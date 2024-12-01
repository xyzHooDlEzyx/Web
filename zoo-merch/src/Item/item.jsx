import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductContext } from "../Context/ProductContext";
import Button from "../button/button";
import "./item.css";

const Item = () => {
  const { id } = useParams();
  const { products } = useProductContext();
  const navigate = useNavigate();

  console.log(products);
  if (!Array.isArray(products)) {
    return <p>Loading item details...</p>;
  }

  const item = products.find((product) => product.id === parseInt(id));

  if (!item) {
    return <p>Item not found.</p>;
  }

  return (
    <div className="item-page">
      <div className="item-container">
        <div className="image-container">
          <img className="item-image" src={item.imgSrc} alt={item.alter} />
        </div>

        <div className="desc-and-cart">
          <div className="proxy">
            <h2 className="item-title">{item.title}</h2>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>

          <p className="item-description">{item.description}</p>
          <p className="item-price">Price: ${item.price}</p>

          <Button>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default Item;
