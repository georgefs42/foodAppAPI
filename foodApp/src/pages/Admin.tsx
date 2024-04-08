import { Link } from 'react-router-dom';
import '../css/AdminPage.css';

const AdminPage = () => {
  return (
    <div className="container">
      <h1>This page is only for the Admin</h1>
      <h2>Please use these buttons to ADD, REMOVE or UPPDATE a Recipe!</h2>
      <div className="button-container">
        <Link to="/AddRecipe">
          <button className="button" data-message="Click to add a recipe">Add Recipe</button>
        </Link>

        <Link to="/DeleteRecipe">
          <button className="button" data-message="Click to delete a recipe">Delete Recipe</button>
        </Link>

        <Link to="/ModifyRecipe">
          <button className="button" data-message="Click to Modify a recipe">Modify Recipe</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
