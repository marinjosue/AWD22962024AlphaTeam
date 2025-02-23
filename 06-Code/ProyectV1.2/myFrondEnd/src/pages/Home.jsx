import "../styles/styles.css";

function Home() {
  return (
    <div>
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
            Te damos la más cordial bienvenida a nuestra plataforma web, especializada en
            la oferta y venta de cursos de cosmetología, con un enfoque particular en el área de masajes.
          </h3>
          <a href="https://chat.whatsapp.com/DKUeRaOpLTeEWAmE8gpvhI" className="btm-banner" target="_blank" rel="noopener noreferrer">
            CONTACTO
          </a>
        </section>

        <div className="layout-container">
          <div className="left-section">
            <img className="course-image" src="/img/imgcourse.jpg" alt="Curso de Masajes" />
          </div>
          <div className="right-section">
            <section id="about">
              <h2>OBJETIVO DEL CURSO</h2>
              <p>
                Sumérgete en el fascinante mundo de los masajes y adquiere un conocimiento profundo sobre la
                anatomía y fisiología humanas.
              </p>
            </section>
            <section id="program">
              <h2>PROGRAMA</h2>
              <p>Descarga el Programa Completo para Descubrir:</p>
              <ul>
                <li>Detalles completos del programa de estudio.</li>
                <li>Profundización en temas clave como los biotipos cutáneos.</li>
                <li>Acceso a información privilegiada sobre técnicas avanzadas.</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
