import React from "react";

const LoginForm = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title mb-0">Iniciar Sesión</h3>
      </div>
      <div className="card-body">
        <form id="loginForm">
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

          {/* Separador */}
          <div className="d-flex align-items-center mb-3">
            <div className="flex-grow-1 border-bottom"></div>
            <div className="px-3">O</div>
            <div className="flex-grow-1 border-bottom"></div>
          </div>

          {/* Google Sign-In Button */}
          <div id="g_id_onload"
            data-client_id="273833412389-akcr05jeal097enbjia7jgroio5hkkc0.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-callback="handleCredentialResponse"
            data-auto_prompt="false">
          </div>

          <div className="g_id_signin" data-type="standard" data-shape="rectangular" data-theme="outline"
            data-text="signin_with" data-size="large" data-logo_alignment="left" data-width="100%">
          </div>
        </form>
      </div>
      <div className="card-footer text-center">
        <small>¿No tienes cuenta? <a href="register.html" className="text-primary">Regístrate</a></small>
      </div>
    </div>
  );
};

export default LoginForm;
