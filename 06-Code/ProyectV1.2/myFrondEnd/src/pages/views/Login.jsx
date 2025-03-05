// src/pages/views/Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Login.module.css'; // Importa el CSS Module

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
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Iniciar Sesión</h3>
          </div>
          <div className={styles.cardBody}>
            <form id={styles.loginForm} onSubmit={handleSubmit}>
              <div className={`${styles.inputGroup} ${styles.mb3}`}>
                <span className={`${styles.inputGroupText} ${styles.bgPrimary} ${styles.textWhite}`}>
                  <i className="fas fa-user"></i>
                </span>
                <input
                  type="text"
                  className={styles.formControl}
                  id="username"
                  placeholder="Ingresa tu cédula"
                  required
                />
              </div>
              <div className={`${styles.inputGroup} ${styles.mb1}`}>
                <span className={`${styles.inputGroupText} ${styles.bgPrimary} ${styles.textWhite}`}>
                  <i className="fas fa-lock"></i>
                </span>
                <input
                  type="password"
                  className={styles.formControl}
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>
              <div className={styles.forgotPassword}>
                <a href="#">¿Olvidaste tu contraseña?</a>
              </div>
              <button type="submit" className={`${styles.btn} ${styles.btnPrimary} ${styles.w100} ${styles.mb3}`}>
                Iniciar Sesión
              </button>
              <div className={styles.separator}>
                <div className={styles.flexGrow1 + ' ' + styles.borderBottom}></div>
                <div className={styles.px3}>O</div>
                <div className={styles.flexGrow1 + ' ' + styles.borderBottom}></div>
              </div>
              {/* Aquí puedes integrar el botón de Google Sign-In si lo deseas */}
            </form>
          </div>
          <div className={styles.cardFooter + " " + styles.textCenter}>
            <small>
              ¿No tienes cuenta? <a href="/register" className={styles.textPrimary}>Regístrate</a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
