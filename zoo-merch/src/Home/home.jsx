import { useState } from "react";
import "./home.css";
import data from "../Data/data";
import Card from "../card/card";
import Button from "../button/button";

const Home = () => {
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
        {data.map((item) => (
          <div className="card-container" key={item.id}>
            <Card {...item} />
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button>View More</Button>
      </div>
    </section>
  );
};

export default Home;
