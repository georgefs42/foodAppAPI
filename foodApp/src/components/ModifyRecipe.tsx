// ModifyRecipe.tsx

import React, { useState, useEffect } from "react";
import "../css/ModifyRecipe.css";

interface Recipe {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  timeInMins: number;
  price: number;
  category: string;
}

const ModifyRecipe: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        "https://sti-java-grupp8-ctcktc.reky.se/recipes"
      );
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
    setSelectedRecipes((prevSelectedRecipes) =>
      prevSelectedRecipes.includes(recipeId)
        ? prevSelectedRecipes.filter((id) => id !== recipeId)
        : [...prevSelectedRecipes, recipeId]
    );
  };

  const handleModifySelectedRecipes = () => {
    setShowForm(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    recipeId: string,
    field: keyof Recipe
  ) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe._id === recipeId ? { ...recipe, [field]: e.target.value } : recipe
    );
    setRecipes(updatedRecipes);
  };

  const handleUpdateRecipe = async (updatedRecipe: Recipe) => {
    try {
      const response = await fetch(
        `https://sti-java-grupp8-ctcktc.reky.se/recipes/${updatedRecipe._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRecipe),
        }
      );
      if (response.ok) {
        console.log("Recipe updated successfully");
        fetchRecipes();
      } else {
        console.error("Failed to update recipe");
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <div className="modify-recipe-container">
      <h2>Modify Recipe</h2>
      {showForm ? (
        <div>
          {selectedRecipes.map((recipeId) => {
            const recipe = recipes.find((r) => r._id === recipeId);
            if (!recipe) return null;
            return (
              <div key={recipe._id} className="recipe">
                <h3>{recipe.title}</h3>
                <label>Title:</label>
                <input
                  type="text"
                  value={recipe.title}
                  onChange={(e) => handleInputChange(e, recipe._id, "title")}
                />
                <label>Description:</label>
                <input
                  type="text"
                  value={recipe.description}
                  onChange={(e) =>
                    handleInputChange(e, recipe._id, "description")
                  }
                />
                <label>Image URL:</label>
                <input
                  type="text"
                  value={recipe.imageUrl}
                  onChange={(e) => handleInputChange(e, recipe._id, "imageUrl")}
                />
                <label>Time (in mins):</label>
                <input
                  type="number"
                  value={recipe.timeInMins}
                  onChange={(e) =>
                    handleInputChange(e, recipe._id, "timeInMins")
                  }
                />
                <label>Price:</label>
                <input
                  type="number"
                  value={recipe.price}
                  onChange={(e) => handleInputChange(e, recipe._id, "price")}
                />
                <label>Category:</label>
                <select
                  value={recipe.category}
                  onChange={(e) => handleInputChange(e, recipe._id, "category")}
                >
                  <option value="">Select a category</option>
                  <option value="main">Main</option>
                  <option value="side">Side</option>
                </select>
                <button onClick={() => handleUpdateRecipe(recipe)}>
                  Update Recipe
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h3>Select Recipes to Modify:</h3>
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
          <button onClick={handleModifySelectedRecipes}>
            Modify Selected Recipes
          </button>
        </div>
      )}
    </div>
  );
};

export default ModifyRecipe;
