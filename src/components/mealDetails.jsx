import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./mealDetails.css";

export const MealDetail = () => {
  const { idMeal } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    async function fetchMeal() {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        );
        const json = await response.json();
        setMeal(json.meals ? json.meals[0] : null);
      } catch (error) {
        console.error("Error loading meal details:", error);
      }
    }
    fetchMeal();
  }, [idMeal]);

  const getIngredients = () => {
    if (!meal) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ing && ing.trim()) ingredients.push(`${ing} - ${measure}`);
    }
    return ingredients;
  };

  if (!meal) return <p>Loading...</p>;

  return (
    <div className="meal-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} />

      <p>
        <strong>Category:</strong> {meal.strCategory}
      </p>
      <p>
        <strong>Area:</strong> {meal.strArea}
      </p>
      <p>
        <strong>Instructions:</strong> {meal.strInstructions}
      </p>

      <h3>Ingredients:</h3>
      <ul>
        {getIngredients().map((ing, index) => (
          <li key={index}>{ing}</li>
        ))}
      </ul>
    </div>
  );
};
