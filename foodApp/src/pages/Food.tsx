import { useState, useEffect, useRef } from "react";
import "../css/FoodPage.css";
import { Link } from "react-router-dom";
import SidesPage from "../components/Sides";

interface Recipe {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  timeInMins: number;
  price: number;
  instructions: string[];
  categories: string[];
}

interface CartItem {
  recipe: Recipe;
  quantity: number;
}

const FoodPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]); // Array of items in the cart
  const [showSides, setShowSides] = useState(false); // State to manage the visibility of sides section
  const sidesRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    // Calculate total price whenever cart changes
    const calculateTotalPrice = () => {
      const total = cart.reduce(
        (acc, item) => acc + item.recipe.price * item.quantity,
        0
      );
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
      const mainRecipes = data.filter(recipe => recipe.categories.includes("main"));
      setRecipes(mainRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const addToCart = (recipeId: string) => {
    const existingItemIndex = cart.findIndex(
      (item) => item.recipe._id === recipeId
    );
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      const recipeToAdd = recipes.find((recipe) => recipe._id === recipeId);
      if (recipeToAdd) {
        setCart([...cart, { recipe: recipeToAdd, quantity: 1 }]);
      }
    }
  };

  const removeFromCart = (recipeId: string) => {
    const updatedCart = cart
      .map((item) => {
        if (item.recipe._id === recipeId) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  const handlePayment = () => {
    // Add your payment logic here
    alert("Payment Successful!");
  };

  const handleOnClick = (recipeId: string) => {
    return (
      <Link to={`/FoodDetails/${recipeId}`}>Details</Link>
    );
  };
  //funktion för att visa/ej visa sides
  const toggleSides = () => {
    setShowSides((prev) => !prev);
  };
  //Funktion för att scrolla ner när sides visas
  useEffect(() => {
    if (showSides) {
      setTimeout(() => {
        sidesRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300); 
    }
  }, [showSides]);

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
                  <button>
                   {handleOnClick(recipe._id)}
                  </button>
                  <button onClick={toggleSides}>
                    {showSides ? "Hide Sides" : "Show Sides"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showSides && (
        <div ref={sidesRef} className="sides-container">
          <h2>Sides</h2>

          {<SidesPage/>}
        </div>
      )}
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
            <button onClick={() => removeFromCart(item.recipe._id)}>
              Remove
            </button>
          </div>
        ))}
        <p className="total-price">
          Total Price:{" "}
          {cart.reduce(
            (acc, item) => acc + item.recipe.price * item.quantity,
            0
          )}{" "}
          SEK
        </p>
        <button className="payment-button" onClick={handlePayment}>
          PAY
        </button>
      </div>
    </div>
  );
};

export default FoodPage;
