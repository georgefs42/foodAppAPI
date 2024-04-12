import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Homepage from './pages/Home';
import FoodPage from './pages/Food';
import AboutUs from './pages/AboutUs';
import ContactPage from './pages/Contact';
import AdminPage from './pages/Admin';
import AddRecipe from './components/RecipesAdding';
import DeleteRecipe from './components/RecipesDeleting';
import ModifyRecipe from './components/ModifyRecipe'
import FoodDetailsPage from './components/FoodDetails';


function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar cartItemsCount={0}/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Food" element={<FoodPage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactPage" element={<ContactPage />} />
          <Route path="/AddRecipe" element={<AddRecipe />} />
          <Route path="/AdminPage" element={<AdminPage/>}/>
          <Route path="/DeleteRecipe" element={<DeleteRecipe/>}/>
          <Route path="/ModifyRecipe" element={<ModifyRecipe/>}/>
          <Route path="/FoodDetails/:recipeId" element={<FoodDetailsPage/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
