import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/login.css';

const Login = () => {
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
        alert(`Has iniciado sesión como ${data.role}`);
        window.location.href = '/';
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Hubo un problema al conectarse con el servidor');
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
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
                <input type="text" className="form-control" id="username" placeholder="Ingresa tu cédula" required />
              </div>
              <div className="mb-1 input-group">
                <span className="input-group-text bg-primary text-white">
                  <i className="fas fa-lock"></i>
                </span>
                <input type="password" className="form-control" id="password" placeholder="Ingresa tu contraseña" required />
              </div>
              <div className="forgot-password">
                <a href="#">¿Olvidaste tu contraseña?</a>
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-3">Iniciar Sesión</button>
              <div className="d-flex align-items-center mb-3">
                <div className="flex-grow-1 border-bottom"></div>
                <div className="px-3">O</div>
                <div className="flex-grow-1 border-bottom"></div>
              </div>
              {/* Google Sign-In se puede integrar aquí */}
              <div id="g_id_onload"
                data-client_id="273833412389-akcr05jeal097enbjia7jgroio5hkkc0.apps.googleusercontent.com"
                data-context="signin" data-ux_mode="popup" data-callback="handleCredentialResponse"
                data-auto_prompt="false"></div>
              <div className="g_id_signin" data-type="standard" data-shape="rectangular" data-theme="outline"
                data-text="signin_with" data-size="large" data-logo_alignment="left" data-width="100%"></div>
            </form>
          </div>
          <div className="card-footer text-center">
            <small>¿No tienes cuenta? <a href="/register" className="text-primary">Regístrate</a></small>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
