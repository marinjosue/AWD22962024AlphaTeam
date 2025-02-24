import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes conectar con la REST API para autenticar
    console.log("Usuario:", username, "Contraseña:", password);
    
    // Simulación de login exitoso y redirección
    if (username === "admin" && password === "1234") {
      window.localStorage.setItem("userRole", "admin"); // Guardamos el rol
      navigate("/dashboard"); // Redirigir según el rol
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title mb-0">Iniciar Sesión</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 input-group">
              <span className="input-group-text bg-primary text-white">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Ingresa tu cédula"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-1 input-group">
              <span className="input-group-text bg-primary text-white">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Ingresa tu contraseña"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="forgot-password">
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              Iniciar Sesión
            </button>
          </form>
        </div>
        <div className="card-footer text-center">
          <small>
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-primary">
              Regístrate
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
