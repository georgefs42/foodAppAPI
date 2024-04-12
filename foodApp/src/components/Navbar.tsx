import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import '../css/Navbar.css'
import { Link } from 'react-router-dom';
interface NavbarProps {
  cartItemsCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartItemsCount }) => {
  return (
    <nav>
      <div className="logo">Food and Cocktails</div>
      <ul className="nav-links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/Food">Food</Link></li>
      <li><Link to="/AboutUs">AboutUs</Link></li>
      <li><Link to="/ContactPage">Contact</Link></li>
      <li><Link to="/AdminPage">Admin</Link></li>
      </ul>
      
    </nav>
  );
};

export default Navbar;
