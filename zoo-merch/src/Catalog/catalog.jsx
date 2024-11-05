import "./catalog.css";
import Searchbar from "../Searchbar/searchbar";
import Card from "../card/card";
import data from "../Data/data";
import { useState } from "react";

const Catalog = () => {
  const [cards, setCards] = useState(data);
  return (
    <>
      <Searchbar />
      <div className="card-row text-center">
        {cards.map((card) => (
          <div className="card-container" key={card.id}>
            <Card {...card} type="full" />
          </div>
        ))}
      </div>
    </>
  );
};

export default Catalog;
