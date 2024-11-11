import React from "react";
import { useNavigate } from "react-router-dom";
import "./card.css";
import Button from "../button/button";

const Card = ({
  id,
  title,
  description,
  descriptionSmall,
  alter,
  imgSrc,
  price,
  type = "simple",
}) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/item/${id}`);
  };

  if (type === "simple") {
    return (
      <div className="card card_simple">
        <img src={imgSrc} alt={alter} className="card_img" />
        <h2 className="heading-secondary">{title}</h2>
        <p className="paragraph">{descriptionSmall}</p>
      </div>
    );
  } else if (type === "full") {
    return (
      <div className="card card-full">
        <div id="card_top">
          <p id="card_id">{id}</p>
        </div>
        <div id="card_cont">
          <img src={imgSrc} alt={alter} className="card_img" />
          <h2 className="heading-secondary">{title}</h2>
          <p className="paragraph">{descriptionSmall}</p>
          <div className="card_value">
            <h3 className="heading-tertiary">Price:</h3>
            <span className="card_price">{price}</span>
          </div>
          <Button Big={true} onClick={handleViewMore}>
            View more
          </Button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Card;
