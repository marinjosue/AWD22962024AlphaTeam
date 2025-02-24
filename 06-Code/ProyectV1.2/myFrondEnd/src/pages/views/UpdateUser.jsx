import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/perfile.css';

const API_URL = 'http://ec2-3-15-222-198.us-east-2.compute.amazonaws.com:3000';

const UpdateUser = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    if (userId) {
      loadUserData(userId);
    } else {
      alert('ID de usuario no proporcionado.');
    }
  }, []);

  const loadUserData = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/users/${id}`);
      if (response.ok) {
        const user = await response.json();
        document.getElementById('id').value = user.id;
        document.getElementById('cedula').value = user.cedula;
        document.getElementById('first_name').value = user.first_name;
        document.getElementById('last_name').value = user.last_name;
        document.getElementById('email').value = user.email;
        document.getElementById('address').value = user.address || '';
        document.getElementById('phone').value = user.phone || '';
        document.getElementById('password').value = user.password || '';
      } else {
        showModal('Error', 'Usuario no encontrado.');
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
      showModal('Error', 'Error al cargar los datos del usuario.');
    }
  };

  const showModal = (title, message) => {
    alert(`${title}: ${message}`);
  };

  const handleSave = async () => {
    const form = document.getElementById('edit-user-form');
    const formData = new FormData(form);
    const fileInput = document.getElementById('profile_image');
    const file = fileInput.files[0];
    let profileImageName = 'default.png';
    if (file) {
      const cedula = document.getElementById('cedula').value;
      const renamedFile = new File([file], `${cedula}.png`, { type: file.type });
      profileImageName = renamedFile.name;
    }
    formData.set('profile_image', profileImageName);
    const userId = formData.get('id');
    const userData = Object.fromEntries(formData.entries());
    try {
      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        showModal('Éxito', 'Usuario actualizado correctamente.');
        setTimeout(() => {
          window.location.href = '/admin/profile';
        }, 2000);
      } else {
        const error = await response.json();
        showModal('Error', error.message || 'Error al actualizar el usuario.');
      }
    } catch (error) {
      showModal('Error', 'Error al guardar los cambios.');
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="card">
          <div className="card-header bg-primary text-white text-center">
            <h4>Editar Usuario</h4>
          </div>
          <div className="card-body">
            <div id="alert-container"></div>
            <form id="edit-user-form" encType="multipart/form-data">
              <input type="hidden" name="id" id="id" />
              <input type="hidden" name="cedula" id="cedula" />
              <div className="mb-3">
                <label htmlFor="first_name" className="form-label">Nombre:</label>
                <input type="text" name="first_name" id="first_name" className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="last_name" className="form-label">Apellido:</label>
                <input type="text" name="last_name" id="last_name" className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo:</label>
                <input type="email" name="email" id="email" className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Dirección:</label>
                <input type="text" name="address" id="address" className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Teléfono:</label>
                <input type="text" name="phone" id="phone" className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña:</label>
                <input type="password" name="password" id="password" className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="profile_image" className="form-label">Actualizar Foto de Perfil:</label>
                <input type="file" name="profile_image" id="profile_image" className="form-control" accept=".png" />
              </div>
              <div className="mb-3">
                <label htmlFor="image-preview" className="form-label">Vista Previa de la Imagen:</label>
                <div id="image-preview"></div>
              </div>
              <div className="text-center">
                <button type="button" id="save-button" className="btn btn-primary" onClick={handleSave}>Guardar Cambios</button>
              </div>
              <br />
              <div className="text-center">
                <a href="/admin/profile" className="btn btn-secondary">Cancelar</a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateUser;
