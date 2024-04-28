import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css'; // Import CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">MySite</Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/resume" className="nav-links">Resume</Link>
          </li>
          <li className="nav-item">
            <Link to="/todo" className="nav-links">To-Do List</Link>
          </li>
          <li className="nav-item">
            <Link to="/ratings" className="nav-links">Ratings</Link>
          </li>
          <li className="nav-item">
            <Link to="/gym" className="nav-links">Gym</Link>
          </li>
          <li className="nav-item">
            <Link to="/poker" className="nav-links">Poker Tracker</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
