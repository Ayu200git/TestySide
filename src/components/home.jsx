import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="home">
      <div className="hero-content">
        <h1 className="title">🍳 Recipe Finder</h1>
        <p className="subtitle">
          Discover delicious meals from around the world in seconds!
        </p>
        <button className="btn" onClick={() => navigate("/search")}>
          Start Exploring
        </button>
      </div>

      <div className="hero-img">
        <img
          src="https://cdn-icons-png.flaticon.com/512/706/706164.png"
          alt="chef"
        />
      </div>
    </section>
  );
};
