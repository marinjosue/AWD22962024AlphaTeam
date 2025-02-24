import React, { useEffect } from 'react';
import AdminHeader from '../../components/AdminHeader';
import Footer from '../../components/Footer';
import '../../styles/perfile.css';

const Profile = () => {
  useEffect(() => {
    const photo = document.getElementById('photo');
    if (photo) {
      photo.onerror = () => {
        photo.src = '/imgProfile/default.png';
      };
    }
    // Aquí puedes implementar la carga de datos desde la API
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  };

  return (
    <div>
      <AdminHeader />
      <main className="container mt-5">
        <h1 className="text-center">Perfil del Usuario</h1>
        <div className="profile-container formaCo d-flex flex-wrap justify-content-center gap-4">
          <div className="card text-center p-3" style={{ width: '15rem' }}>
            <img id="photo" className="card-img-top rounded-circle" src="/imgProfile/admin.jpg" alt="Foto del Administrador" />
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
            <a href="/admin/courses" className="btn btn-primary d-flex align-items-center gap-2">
              <i className="fa-solid fa-book"></i> Gestión de Cursos
            </a>
            <a href="/admin/users" className="btn btn-secondary d-flex align-items-center gap-2">
              <i className="fa-solid fa-users"></i> Gestión de Usuarios
            </a>
            <a href="/admin/report" className="btn btn-info text-white d-flex align-items-center gap-2">
              <i className="fa-solid fa-chart-pie"></i> Estadísticas
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

export default Profile;
