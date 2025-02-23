import "../styles/footer.css"; // Asegúrate de que el CSS esté en la carpeta correcta

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
            <a href="https://www.facebook.com/profile.php?id=100009361808424" className="text-white" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-facebook"></i> Facebook
            </a><br />
            <a href="https://www.instagram.com/lum.massagebar/" className="text-white" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-instagram"></i> Instagram
            </a><br />
            <a href="https://www.youtube.com/watch?v=Riz724D2Dps" className="text-white" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-youtube"></i> YouTube
            </a>
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
