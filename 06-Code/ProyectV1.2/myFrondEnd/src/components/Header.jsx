import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="navbar">
        <div className="logo">
          <Link to="/"><img className="logo-img" src="/img/holistica_logo.png" alt="Logo" /></Link>
        </div>
        <div className="hamburger" id="hamburger">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <nav className="main-menu" id="navbar">
          <ul>
            <li className="menu"><Link to="/">Home</Link></li>
            <li className="menu"><Link to="/viewCourses">Cursos</Link></li>
            <li className="menu"><Link to="/contact">Contacto</Link></li>
          </ul>
        </nav>
        <div className="user-options">
          <span id="user-links">
            <Link to="/login" className="login-btn">Entrar</Link>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
