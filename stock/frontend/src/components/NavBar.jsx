// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; 

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">MyApp</div>
      <div className="navbar-links">
        <Link to="/login" className="navbar-link">Login</Link>
        <Link to="/register" className="navbar-link">Register</Link>
        <Link to="/dashboard" className="navbar-link">Dashboard</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
};

export default NavBar;
