import { useState } from "react";
import '../css/AddRecipe.css'

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [timeInMins, setTimeInMins] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [newInstruction, setNewInstruction] = useState("");
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [ingredients, setIngredients] = useState<
    { name: string; amount: number; unit: string }[]
  >([]);

  // Funktion för att lägga till en ny ingredient till min ingredient array
  const handleAddIngredient = () => {
    // Updaterar setIngredients "staten" genom att ta den gamla arrayen och "skapa" en ny med den nya ingredienten
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      { name: "", amount: 0, unit: "" },
    ]);
  };
  
  
  //Likadan funktion för instruktion eftersom det kan behöva vara flera rader. 
  //Trimmar bort tom text ifall det finns bakom instruktionerna
  const handleAddInstruction = () => {
    if (newInstruction.trim() !== "") {
      setInstructions((prevInstructions) => [
        ...prevInstructions,
        newInstruction.trim(),
      ]);
      setNewInstruction("");
    }
  };

  const handleAddRecipe = async () => {
    try {
      const response = await fetch(
        "https://sti-java-grupp8-ctcktc.reky.se/recipes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
            timeInMins,
            price,
            categories: [category],
            instructions,
            ingredients,
          }),
        }
      );

      if (response.ok) {
        //Console logga id som skapas för receptet
        const responseData = await response.json();
        const newRecipeId = responseData._id;
        console.log("Recipe added successfully. New recipe ID:", newRecipeId);
        console.log("Recipe added successfully");
        // Återställer alla värden
        setTitle("");
        setDescription("");
        setImageUrl("");
        setTimeInMins(0);
        setPrice(0);
        setCategory("");
        setInstructions([]);
        setIngredients([]);
        setNewInstruction("");
      } else {
        console.error("Failed to add recipe");
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <div className="add-recipe-container">
      <h2>Add Recipe</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <div>
        <label>Time (in mins):</label>
        <input
          type="number"
          value={timeInMins}
          onChange={(e) => setTimeInMins(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select a category</option>
          <option value="main">Main</option>
          <option value="side">Side</option>
        </select>
      </div>
      <div>
        <label>Instructions:</label>
        {instructions.map((instruction, index) => (
          <div key={index}>{instruction}</div>
        ))}
        <input
          type="text"
          value={newInstruction}
          onChange={(e) => setNewInstruction(e.target.value)}
          placeholder="Enter new instruction"
        />
        <button className="add-instruction-button" onClick={handleAddInstruction}>Add Instruction</button>
      </div>
      <div>
        <label>Ingredients:</label>
        {ingredients.map((ingredient, index) => (
  <div key={index}>
    <input
      type="text"
      value={ingredient.name}
      placeholder="Name"
      onChange={(e) => {
        const value = e.target.value;
        setIngredients((prevIngredients) => {
          const updatedIngredients = [...prevIngredients];
          updatedIngredients[index].name = value;
          return updatedIngredients;
        });
      }}
    />
    <input
      type="number"
      value={ingredient.amount}
      placeholder="Amount"
      onChange={(e) => {
        const value = parseInt(e.target.value);
        setIngredients((prevIngredients) => {
          const updatedIngredients = [...prevIngredients];
          updatedIngredients[index].amount = value;
          return updatedIngredients;
        });
      }}
    />
    <input
      type="text"
      value={ingredient.unit}
      placeholder="Unit"
      onChange={(e) => {
        const value = e.target.value;
        setIngredients((prevIngredients) => {
          const updatedIngredients = [...prevIngredients];
          updatedIngredients[index].unit = value;
          return updatedIngredients;
        });
      }}
    />
  </div>
))}
        <button className="add-ingredient-button" onClick={handleAddIngredient}>Add Ingredient</button>
      </div>
      <button className="add-recipe-button" onClick={handleAddRecipe}>Add Recipe</button>
    </div>
  );
};

export default AddRecipe;
