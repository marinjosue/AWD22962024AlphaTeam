import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/login.css'; // Importa solo aquí los estilos del login

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const API_URL = 'http://ec2-3-15-222-198.us-east-2.compute.amazonaws.com:3000/api/auth/login';
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('userId', data.id);
        // Redirige según el rol del usuario
        if (data.role === 'Admin') {
          navigate('/admin/profile');
        } else if (data.role === 'Student') {
          navigate('/user/profile');
        } else {
          navigate('/');
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Hubo un problema al conectarse con el servidor');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title mb-0">Iniciar Sesión</h3>
          </div>
          <div className="card-body">
            <form id="loginForm" onSubmit={handleSubmit}>
              <div className="mb-3 input-group">
                <span className="input-group-text bg-primary text-white">
                  <i className="fas fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Ingresa tu cédula"
                  required
                />
              </div>
              <div className="mb-1 input-group">
                <span className="input-group-text bg-primary text-white">
                  <i className="fas fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>
              <div className="forgot-password">
                <a href="#">¿Olvidaste tu contraseña?</a>
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-3">
                Iniciar Sesión
              </button>
              <div className="d-flex align-items-center mb-3">
                <div className="flex-grow-1 border-bottom"></div>
                <div className="px-3">O</div>
                <div className="flex-grow-1 border-bottom"></div>
              </div>
              {/* Aquí puedes integrar el botón de Google Sign-In si lo deseas */}
            </form>
          </div>
          <div className="card-footer text-center">
            <small>
              ¿No tienes cuenta? <a href="/register" className="text-primary">Regístrate</a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
