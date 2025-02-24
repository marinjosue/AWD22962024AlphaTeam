import React, { useEffect } from 'react';
import UserHeader from '../../components/UserHeader';
import Footer from '../../components/Footer';
import '../../styles/perfile.css';

const ProfileUser = () => {
  useEffect(() => {
    const photo = document.getElementById('photo');
    if (photo) {
      photo.onerror = () => {
        photo.src = '/imgprofile/default.png';
      };
    }
    // Aquí se puede cargar la información del usuario desde la API
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  };

  return (
    <div>
      <UserHeader />
      <main className="container mt-5">
        <h1 className="text-center">Perfil del Usuario</h1>
        <div className="profile-container formaCo d-flex flex-wrap justify-content-center gap-4">
          <div className="card text-center p-3" style={{ width: '15rem' }}>
            <img id="photo" className="card-img-top rounded-circle" src="/imgprofile/usuario.jpg" alt="Foto del Usuario" />
            <div className="card-body">
              <h5 className="card-title" id="fullName">Cargando...</h5>
              <p className="card-text text-muted" id="role">Cargando...</p>
            </div>
          </div>
          <div className="card p-4" style={{ width: '18rem' }}>
            <label htmlFor="id"><strong>Cédula:</strong></label>
            <input type="text" id="id" className="form-control mb-3" readOnly />
            <label htmlFor="email"><strong>Correo Electrónico:</strong></label>
            <input type="email" id="email" className="form-control mb-3" readOnly />
            <label htmlFor="phone"><strong>Teléfono:</strong></label>
            <input type="text" id="phone" className="form-control" readOnly />
          </div>
        </div>
        <section className="mt-5">
          <h2 className="text-center mb-4">Acciones</h2>
          <div className="d-flex flex-wrap justify-content-center gap-4">
            <a href="/user/coursesEnrolled" className="btn btn-primary d-flex align-items-center gap-2">
              <i className="fa-solid fa-book"></i> Cursos Inscritos
            </a>
            <a href="#" className="btn btn-warning edit-profile-btn">
              <i className="fa-solid fa-user-pen"></i> Editar Perfil
            </a>
            <button onClick={handleLogout} className="btn btn-danger d-flex align-items-center gap-2">
              <i className="fa-solid fa-right-from-bracket"></i> Cerrar Sesión
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileUser;
