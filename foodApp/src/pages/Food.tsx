import { useState, useEffect } from "react";
import "../css/FoodPage.css";

interface Recipe {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  timeInMins: number;
  price: number;
  instructions: string[];
}

interface CartItem {
  recipe: Recipe;
  quantity: number;
}

const FoodPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]); // Array of items in the cart

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    // Calculate total price whenever cart changes
    const calculateTotalPrice = () => {
      const total = cart.reduce((acc, item) => acc + item.recipe.price * item.quantity, 0);
      return total;
    };
    calculateTotalPrice();
  }, [cart]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        "https://sti-java-grupp8-ctcktc.reky.se/recipes"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data: Recipe[] = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const addToCart = (recipeId: string) => {
    const existingItemIndex = cart.findIndex(item => item.recipe._id === recipeId);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      const recipeToAdd = recipes.find(recipe => recipe._id === recipeId);
      if (recipeToAdd) {
        setCart([...cart, { recipe: recipeToAdd, quantity: 1 }]);
      }
    }
  };

  const removeFromCart = (recipeId: string) => {
    const updatedCart = cart.map(item => {
      if (item.recipe._id === recipeId) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }
      return item;
    }).filter(item => item.quantity > 0);
    setCart(updatedCart);
  };

  const handlePayment = () => {
    // Add your payment logic here
    alert("Payment Successful!");
  };

  return (
    <div>
      <h1>Recipes</h1>
      <div className="recipe-container">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <h2>{recipe.title}</h2>
            <div className="recipe-info">
              <div className="recipe-image">
                <img src={recipe.imageUrl} alt="img" />
              </div>
              <div className="recipe-details">
                <p>Description: {recipe.description}</p>
                <p>Time: {recipe.timeInMins} mins</p>
                <p>Price: {recipe.price} SEK</p>
                <div>
                  <h4>Instructions:</h4>
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index}>{instruction}</div>
                  ))}
                </div>
                <div className="recipe-buttons">
                  <button onClick={() => addToCart(recipe._id)}>
                    Add to Cart
                  </button>
                  <button onClick={() => removeFromCart(recipe._id)}>
                    Remove from Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-container">
        <h2>Cart</h2>
        {cart.map((item) => (
          <div key={item.recipe._id} className="cart-item">
            <div className="cart-item-details">
              <img src={item.recipe.imageUrl} alt={item.recipe.title} />
              <div>
                <p>{item.recipe.title}</p>
                <p>Price: {item.recipe.price} SEK</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
            <button onClick={() => removeFromCart(item.recipe._id)}>Remove</button>
          </div>
        ))}
        <p className="total-price">Total Price: {cart.reduce((acc, item) => acc + item.recipe.price * item.quantity, 0)} SEK</p>
        <button className="payment-button" onClick={handlePayment}>PAY</button>
      </div>
    </div>
  );
};

export default FoodPage;
