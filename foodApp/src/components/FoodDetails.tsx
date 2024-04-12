import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Recipe} from "./Types"
import DetailedFoodCard from "./DetailedFoodCard";

const FoodDetailsPage = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`https://sti-java-grupp8-ctcktc.reky.se/recipes/${recipeId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch recipe details");
        }
        const data: Recipe = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  return (
    <div>
      <h1>Food Details</h1>
      {recipe ? (
        <DetailedFoodCard recipe={recipe} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FoodDetailsPage;
