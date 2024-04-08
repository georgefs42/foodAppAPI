import React, { useState, useEffect } from "react";
import '../css/DeleteRecipe.css'

interface Recipe {
  _id: string;
  title: string;
}

const DeleteRecipe: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);

  useEffect(() => {
    // Fetch recipes from the API when the component mounts
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch("https://sti-java-grupp8-ctcktc.reky.se/recipes");
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      } else {
        console.error("Failed to fetch recipes");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleCheckboxChange = (recipeId: string) => {
    // Toggle the selected state of the recipe
    setSelectedRecipes((prevSelectedRecipes) =>
      prevSelectedRecipes.includes(recipeId)
        ? prevSelectedRecipes.filter((id) => id !== recipeId)
        : [...prevSelectedRecipes, recipeId]
    );
  };

  const handleDeleteRecipes = async () => {
    try {
      // Loop through selected recipes and delete each one
      for (const recipeId of selectedRecipes) {
        const response = await fetch(
          `https://sti-java-grupp8-ctcktc.reky.se/recipes/${recipeId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          console.error(`Failed to delete recipe with ID ${recipeId}`);
        }
      }
      console.log("Recipes deleted successfully");
      // Clear the selected recipes after deletion
      setSelectedRecipes([]);
      // Refetch recipes to update the list
      fetchRecipes();
    } catch (error) {
      console.error("Error deleting recipes:", error);
    }
  };

  return (
    <div className="delete-recipe-container">
      <h2>Delete Recipes</h2>
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <input
            type="checkbox"
            checked={selectedRecipes.includes(recipe._id)}
            onChange={() => handleCheckboxChange(recipe._id)}
          />
          <label>{recipe.title}</label>
        </div>
      ))}
      <button onClick={handleDeleteRecipes}>Delete Selected Recipes</button>
      
    </div>
  );
};

export default DeleteRecipe;
