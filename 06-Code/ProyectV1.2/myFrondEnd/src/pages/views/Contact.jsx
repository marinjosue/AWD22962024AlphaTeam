import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Contact = () => {
  useEffect(() => {
    window.initMap = function() {
      const location = { lat: -0.187087, lng: -78.491267 };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location,
      });
      new google.maps.Marker({
        position: location,
        map: map,
        title: "Sede Principal",
      });
    };
    // Google Maps API se carga en index.html o mediante script dinámico
  }, []);

  return (
    <div>
      <Header />
      <main className="container mt-5">
        <h1 className="text-center mb-4">Información de Contacto</h1>
        <section className="mb-5">
          <div className="row">
            <div className="col-md-6">
              <h2>Detalles de Contacto</h2>
              <p><i className="fa-solid fa-user"></i> <strong>Nombre:</strong> Juan Pérez</p>
              <p><i className="fa-solid fa-envelope"></i> <strong>Email:</strong> admin@example.com</p>
              <p><i className="fa-solid fa-phone"></i> <strong>Teléfono:</strong> +593 987654321</p>
              <p><i className="fa-solid fa-clock"></i> <strong>Horario de Atención:</strong></p>
              <ul>
                <li>Lunes a Viernes: 08:00 AM - 05:00 PM</li>
                <li>Sábado: 09:00 AM - 12:00 PM</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h2>Ubicación</h2>
              <p>Las clases presenciales se dictan en:</p>
              <p><i className="fa-solid fa-location-dot"></i> 10 de Agosto y Mariana de Jesús, Quito, Ecuador</p>
              <div id="map" style={{ height: '300px', borderRadius: '8px' }}></div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-center mb-4">Envíanos tu Consulta</h2>
          <form id="contact-form">
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="name" placeholder="Ingresa tu nombre" required />
              </div>
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Ingresa tu correo electrónico" required />
              </div>
              <div className="col-12">
                <label htmlFor="message" className="form-label">Consulta</label>
                <textarea className="form-control" id="message" rows="5" placeholder="Escribe tu consulta aquí..." required></textarea>
              </div>
              <div className="col-12 text-center">
                <button type="submit" className="btn btn-primary mt-3">Enviar Consulta</button>
              </div>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
