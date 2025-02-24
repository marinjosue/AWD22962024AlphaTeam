import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  const renderMenu = () => {
    if (userRole === "admin") {
      return (
        <ul>
          <li className="menu"><Link to="/">Home</Link></li>
          <li className="menu"><Link to="/manage-courses">Gestionar Cursos</Link></li>
          <li className="menu"><Link to="/contact">Contacto</Link></li>
          <li className="menu"><Link to="/manage-users">Gestionar Usuarios</Link></li>
          <li className="menu"><Link to="/report">Reporte</Link></li>
        </ul>
      );
    } else if (userRole === "user") {
      return (
        <ul>
          <li className="menu"><Link to="/">Home</Link></li>
          <li className="menu"><Link to="/courses">Cursos</Link></li>
          <li className="menu"><Link to="/contact">Contacto</Link></li>
          <li className="menu"><Link to="/my-courses">Cursos Inscritos</Link></li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li className="menu"><Link to="/">Home</Link></li>
          <li className="menu"><Link to="/courses">Cursos</Link></li>
          <li className="menu"><Link to="/contact">Contacto</Link></li>
        </ul>
      );
    }
  };

  return (
    <header className="header">
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <img className="logo-img" src="/img/holistica_logo.png" alt="Logo" />
          </Link>
        </div>

        <nav className="main-menu">
          {renderMenu()}
        </nav>

        <div className="user-options">
          {userRole ? (
            <Link to={userRole === "admin" ? "/admin-profile" : "/user-profile"} className="login-btn">
              Perfil
            </Link>
          ) : (
            <button className="login-btn" onClick={() => window.open("/login", "_blank", "width=500,height=600")}>
              Entrar
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
