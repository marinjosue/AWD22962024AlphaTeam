import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/viewcourses.css';

const ViewCourses = () => {
  return (
    <div>
      <Header />
      <menu>
        <section className="courses-section">
          <div className="course-card">
            <h3>Masaje Relajante</h3>
            <img src="/img/relajante.webp" alt="Imagen" />
            <p><strong>Fecha Inicio:</strong> 2024-12-01</p>
            <p><strong>Fecha Fin:</strong> 2024-12-05</p>
            <p><strong>Capacidad:</strong> 20 alumnos</p>
            <p><strong>Descripción:</strong> Aprende técnicas de masaje relajante para aliviar tensiones y mejorar el bienestar.</p>
            <button>Inscribirse</button>
            <button>Información</button>
          </div>
          <div className="course-card">
            <h3>Masaje Deportivo</h3>
            <img src="/img/deporte.jpeg" alt="Imagen" />
            <p><strong>Fecha Inicio:</strong> 2025-01-10</p>
            <p><strong>Fecha Fin:</strong> 2025-01-15</p>
            <p><strong>Capacidad:</strong> 15 alumnos</p>
            <p><strong>Descripción:</strong> Especialízate en masajes para atletas y recuperación muscular.</p>
            <button>Inscribirse</button>
            <button>Información</button>
          </div>
          <div className="course-card">
            <h3>Masaje Facial</h3>
            <img src="/img/facial.jpeg" alt="Imagen" />
            <p><strong>Fecha Inicio:</strong> 2025-02-01</p>
            <p><strong>Fecha Fin:</strong> 2025-02-03</p>
            <p><strong>Capacidad:</strong> 10 alumnos</p>
            <p><strong>Descripción:</strong> Aprende técnicas de masaje facial para rejuvenecer la piel y mejorar la circulación.</p>
            <button>Inscribirse</button>
            <button>Información</button>
          </div>
        </section>
      </menu>
      <Footer />
    </div>
  );
};

export default ViewCourses;
