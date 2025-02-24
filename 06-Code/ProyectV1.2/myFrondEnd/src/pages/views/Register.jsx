import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/register.css';

const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      cedula: form.cedula.value,
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      address: form.address.value,
      phone: form.phone.value,
      email: form.email.value,
      password: form.password.value,
      gender: form.gender.value,
    };
    try {
      const API_URL = 'http://ec2-3-15-222-198.us-east-2.compute.amazonaws.com:3000/api/users';
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        alert('¡Registro exitoso! Serás redirigido al inicio de sesión.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        alert(data.message || 'Hubo un error al registrar el usuario.');
      }
    } catch (error) {
      alert('No se pudo conectar con el servidor. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div>
      <Header />
      <div className="register-container">
        <h2>Regístrate</h2>
        <form id="registerForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="cedula" className="form-label">Cédula</label>
            <input type="text" className="form-control" id="cedula" name="cedula" required />
          </div>
          <div className="mb-3">
            <label htmlFor="first_name" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="first_name" name="first_name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="last_name" className="form-label">Apellidos</label>
            <input type="text" className="form-control" id="last_name" name="last_name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Dirección</label>
            <input type="text" className="form-control" id="address" name="address" />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Teléfono</label>
            <input type="tel" className="form-control" id="phone" name="phone" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input type="email" className="form-control" id="email" name="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" name="password" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Género</label>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="gender" value="M" required />
              <label className="form-check-label">Hombre</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="gender" value="F" required />
              <label className="form-check-label">Mujer</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="gender" value="Other" required />
              <label className="form-check-label">Otro</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Registrar</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
