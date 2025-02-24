// src/pages/views/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/styles.css'; // Estilos globales, o los que correspondan a la página de inicio

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <main className="container mt-5">
        <h1>Bienvenido a la Plataforma de Cursos</h1>
        <p>
          Esta es la página principal que muestra el header y el footer. Aquí puedes incluir información
          de bienvenida, promociones, etc.
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/login')}>
          Entrar
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
