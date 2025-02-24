import React from 'react';
import '../styles/footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h4>Nuestra Historia</h4>
          <p>Atención a Empresas</p>
          <p>Adquirir un Punto de Venta</p>
        </div>
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>Términos y Condiciones de Uso</p>
        </div>
        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-icons">
            <Link to="https://www.facebook.com/profile.php?id=100009361808424" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-facebook"></i> Facebook
            </Link><br/>
            <Link to="https://www.instagram.com/lum.massagebar/" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-instagram"></i> Instagram
            </Link><br/>
            <Link to="https://www.youtube.com/watch?v=Riz724D2Dps" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-youtube"></i> YouTube
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-credits">
        <p>Realizado por el grupo <strong>Alpha Team</strong></p>
        <p>¿Tienes preguntas? <a href="mailto:jimarin@espe.edu.ec" className="text-white">Contáctanos aquí</a></p>
      </div>
    </footer>
  );
};

export default Footer;
