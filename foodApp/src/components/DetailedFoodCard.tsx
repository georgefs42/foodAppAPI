import React from "react";
import { Recipe } from "./Types";

interface DetailedFoodCardProps {
  recipe: Recipe;
}

const DetailedFoodCard: React.FC<DetailedFoodCardProps> = ({ recipe }) => {
  return (
    <div className="detailed-food-card">
      <h2>{recipe.title}</h2>
      <div className="recipe-info">
        <div className="recipe-image">
          <img src={recipe.imageUrl} alt={recipe.title} />
        </div>
        <div className="recipe-details">
          <p>Description: {recipe.description}</p>
          <p>Ratings: {recipe.ratings}</p>
          <p>Time: {recipe.timeInMins} mins</p>
          <p>Price: {recipe.price} SEK</p>
          <p>Categories: {recipe.categories.join(", ")}</p>
          <div>
            <h4>Ingredients:</h4>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.amount} {ingredient.unit} {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Instructions:</h4>
            <ol>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedFoodCard;
