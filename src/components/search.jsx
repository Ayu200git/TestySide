import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Debounce } from "/debounce";
import { getRandomMeals, mealApi } from "../api/api";
import "./search.css";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

    async function loadDefaultMeals() {
      if(isLoading) return;
      isLoading=true
      console.log("yes");
      const randomMeals = await getRandomMeals();
      setMeals(randomMeals);
      setIsLoading(false);
    }

  useEffect(() => {
    loadDefaultMeals();
  }, []);

  const searchApi = useMemo(() => {
    return Debounce(async (q) => {
      if (!q.trim()) {
        const defaultMeals = await getRandomMeals();
        setMeals(defaultMeals);
        return;
      }

      try {
        const results = await mealApi(q);
        if (Array.isArray(results)) {
          setMeals(results);
        } else {
          setMeals([]);
        }
      } catch (error) {
        console.error("Error fetching meals:", error);
        setMeals([]);
      }
    }, 500);
  }, []);

  const onChangeQuery = (e) => {
    const q = e.target.value;
    setQuery(q);
    searchApi(q);
  };

  return (
    <div className="search-container">
      <h1 className="title">🍽️ Find your Recipe</h1>

      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="meal-search" className="search-label">
          Search meals:
        </label>
        <input
          id="meal-search"
          name="meal-search"
          type="text"
          value={query}
          onChange={onChangeQuery}
          placeholder="Type a meal name..."
          className="search-input"
        />
      </form>

      <ul className="meal-list">
        {meals.length === 0 && query && (
          <li className="no-results">No meals found..</li>
        )}

        {meals.map((meal) => (
          <li
            key={meal.idMeal}
            className="meal-card"
            onClick={() => navigate(`/meal/${meal.idMeal}`)} 
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="meal-thumb"
            />
            <h3>{meal.strMeal}</h3>
            <p>
              {meal.strArea} • {meal.strCategory}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};




 
