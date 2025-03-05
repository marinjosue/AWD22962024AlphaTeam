// src/pages/views/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/styles.css';

const Home = () => {
  const navigate = useNavigate();

  // Ejemplo de función para togglear secciones de información
  const [visibleInfo, setVisibleInfo] = useState({
    'info-presencial': false,
    'info-semipresencial': false,
    'info-online': false,
  });

  const toggleInfo = (id) => {
    setVisibleInfo(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <Header />
      <div className="imagenes">
        <img src="/img/portada1.jpg" alt="Imagen" />
        <img src="/img/portada2.jpg" alt="Imagen" />
        <img src="/img/portada3.jpg" alt="Imagen" />
        <img src="/img/portada4.jpg" alt="Imagen" />
      </div>
      <main>
        <section className="banner">
          <h1 className="title-banner">Holistic Center cursos de cosmetologia</h1>
          <h3 className="title-text">
            Te damos la más cordial bienvenida a nuestra plataforma web, especializada en la oferta y venta de cursos de cosmetología, con un enfoque particular en el área de masajes. Aquí encontrarás una variedad de cursos diseñados para mejorar tus habilidades y conocimientos en técnicas de masaje relajacion y terapéutico.
          </h3>
          <a
            href="https://chat.whatsapp.com/DKUeRaOpLTeEWAmE8gpvhI"
            className="btm-banner"
            target="_blank"
            rel="noopener noreferrer"
          >
            CONTACTO
          </a>
        </section>

        {/* Si deseas incorporar la lógica de index.js, migra su función a un hook.
            En este ejemplo, se asume que toggleInfo se usa para mostrar/ocultar información */}
        <div className="layout-container">
          <div className="left-section">
            <img className="course-image" src="/img/imgcourse.jpg" alt="Curso de Masajes" />
            <div className="options">
              <div className="option">
                <button className="dropdown-btn" onClick={() => toggleInfo('info-presencial')}>
                  PRESENCIAL
                </button>
                <div className="dropdown-content" id="info-presencial">
                  {visibleInfo['info-presencial'] && (
                    <div className="info-card" id="info-presencial-card">
                      <div className="course-details">
                        <div>
                          <p>7</p>
                          <p>Meses</p>
                        </div>
                        <div>
                          <p>28</p>
                          <p>Clases</p>
                        </div>
                        <div>
                          <p>3</p>
                          <p>Horas</p>
                        </div>
                        <div>
                          <p>1</p>
                          <p>por semana</p>
                        </div>
                      </div>
                      <div className="course-includes">
                        <h4>INCLUYE</h4>
                        <ul>
                          <li>Acceso a nuestra plataforma de contenidos</li>
                          <li>Material digital de estudio</li>
                          <li>Materias especiales (Biología y Química)</li>
                          <li>Exámenes parciales y finales</li>
                          <li>Diploma y credencial profesional</li>
                          <li>Triple Aval Comercial (LACA – IFC – FACE)</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="option">
                <button className="dropdown-btn" onClick={() => toggleInfo('info-semipresencial')}>
                  SEMIPRESENCIAL
                </button>
                <div className="dropdown-content" id="info-semipresencial">
                  {visibleInfo['info-semipresencial'] && (
                    <div className="info-card" id="info-semipresencial-card">
                      <div className="course-details">
                        <div>
                          <p>5</p>
                          <p>Meses</p>
                        </div>
                        <div>
                          <p>20</p>
                          <p>Clases</p>
                        </div>
                        <div>
                          <p>2</p>
                          <p>Horas</p>
                        </div>
                        <div>
                          <p>2</p>
                          <p>por semana</p>
                        </div>
                      </div>
                      <div className="course-includes">
                        <h4>INCLUYE</h4>
                        <ul>
                          <li>Acceso a nuestra plataforma de contenidos</li>
                          <li>Material digital de estudio</li>
                          <li>Materias especiales (Biología y Química)</li>
                          <li>Exámenes parciales y finales</li>
                          <li>Diploma y credencial profesional</li>
                          <li>Triple Aval Comercial (LACA – IFC – FACE)</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="option">
                <button className="dropdown-btn" onClick={() => toggleInfo('info-online')}>
                  ONLINE
                </button>
                <div className="dropdown-content" id="info-online">
                  {visibleInfo['info-online'] && (
                    <div className="info-card" id="info-online-card">
                      <div className="course-details">
                        <div>
                          <p>3</p>
                          <p>Meses</p>
                        </div>
                        <div>
                          <p>12</p>
                          <p>Clases</p>
                        </div>
                        <div>
                          <p>1.5</p>
                          <p>Horas</p>
                        </div>
                        <div>
                          <p>1</p>
                          <p>por semana</p>
                        </div>
                      </div>
                      <div className="course-includes">
                        <h4>INCLUYE</h4>
                        <ul>
                          <li>Acceso a nuestra plataforma de contenidos</li>
                          <li>Material digital de estudio</li>
                          <li>Materias especiales (Biología y Química)</li>
                          <li>Exámenes parciales y finales</li>
                          <li>Diploma y credencial profesional</li>
                          <li>Triple Aval Comercial (LACA – IFC – FACE)</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="right-section">
            <section id="about">
              <h2>OBJETIVO DEL CURSO</h2>
              <p>
                Sumérgete en el fascinante mundo de los masajes y adquiere un conocimiento profundo sobre la anatomía y fisiología humanas. Nuestro curso te proporcionará las herramientas necesarias para dominar técnicas avanzadas de masaje terapéutico y de relajación, ayudándote a aliviar tensiones, mejorar la circulación y promover el bienestar general. Aprenderás a identificar las necesidades individuales de cada cliente, aplicando los principios de la biomecánica y el uso correcto de maniobras como amasamiento, digitopuntura y drenaje linfático.
              </p>
            </section>
            <section id="program">
              <h2>PROGRAMA</h2>
              <p>Descarga el Programa Completo para Descubrir:</p>
              <ul>
                <li>Detalles completos del programa de estudio, incluyendo talleres prácticos y materias teóricas.</li>
                <li>Profundización en temas clave como los biotipos cutáneos, las lesiones elementales y los fototipos cutáneos.</li>
                <li>Acceso a información privilegiada sobre técnicas avanzadas como peeling, revitalización cutánea y masaje eurítmico.</li>
                <li>Exploración de materias teóricas fundamentales como biología y química cosmética, con enfoque en su aplicación práctica en el campo de la cosmetología.</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
