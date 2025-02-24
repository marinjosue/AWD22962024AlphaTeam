import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader';
import Footer from '../../components/Footer';
import '../../styles/courses.css';

const API_URL = 'http://ec2-3-15-222-198.us-east-2.compute.amazonaws.com:3000/api/courses';

const CourseForm = () => {
  const navigate = useNavigate();
  const [unitCount, setUnitCount] = useState(1);
  const [units, setUnits] = useState([{ title: '', content: '' }]);
  const [formData, setFormData] = useState({
    courseName: '',
    courseDescription: '',
    start_date: '',
    end_date: '',
    price: '',
    cedula: '',
    id_category: '',
    status: 'activo',
    course_youtube: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUnitChange = (index, e) => {
    const { name, value } = e.target;
    const updatedUnits = [...units];
    updatedUnits[index] = { ...updatedUnits[index], [name]: value };
    setUnits(updatedUnits);
  };

  const addUnit = () => {
    setUnits(prev => ([...prev, { title: '', content: '' }]));
    setUnitCount(prev => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = {
      courseName: formData.courseName,
      courseDescription: formData.courseDescription,
      start_date: formData.start_date,
      end_date: formData.end_date,
      price: formData.price,
      cedula: formData.cedula,
      id_category: formData.id_category,
      status: formData.status,
      course_youtube: formData.course_youtube,
      unitTitles: units.map(u => u.title),
      unitContents: units.map(u => u.content)
    };

    try {
      const response = await fetch(`${API_URL}/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData)
      });
      const result = await response.json();
      if (result.message) {
        alert(result.message);
        navigate('/admin/courses');
      } else {
        alert('Error al guardar el curso');
      }
    } catch (error) {
      console.error('Error al guardar el curso:', error);
      alert('Hubo un error al guardar el curso.');
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="container mt-5">
        <h1 className="text-center">Agregar Curso</h1>
        <form id="courseForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="courseName" className="form-label">Nombre del Curso</label>
            <input type="text" className="form-control" id="courseName" name="courseName" required onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="courseDescription" className="form-label">Descripción</label>
            <textarea className="form-control" id="courseDescription" name="courseDescription" rows="3" required onChange={handleInputChange}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="courseStart" className="form-label">Fecha de Inicio</label>
            <input type="date" className="form-control" id="courseStart" name="start_date" required onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="courseEnd" className="form-label">Fecha de Fin</label>
            <input type="date" className="form-control" id="courseEnd" name="end_date" required onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="coursePrice" className="form-label">Precio</label>
            <input type="number" className="form-control" id="coursePrice" name="price" required onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="cedula" className="form-label">Cédula del Profesor</label>
            <input type="text" className="form-control" id="cedula" name="cedula" required onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="courseCategory" className="form-label">Categoría</label>
            <input type="number" className="form-control" id="courseCategory" name="id_category" required onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="courseStatus" className="form-label">Estado</label>
            <select className="form-control" id="courseStatus" name="status" onChange={handleInputChange}>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="courseYoutube" className="form-label">Enlace de Video de YouTube</label>
            <input type="url" className="form-control" id="courseYoutube" name="course_youtube" required onChange={handleInputChange} />
          </div>
          <h3>Unidades</h3>
          <div id="unitsContainer" className="mb-4">
            {units.map((unit, index) => (
              <div className="unit" key={index}>
                <label htmlFor={`unitTitle${index + 1}`} className="form-label">Título de la Unidad</label>
                <input type="text" className="form-control" id={`unitTitle${index + 1}`} name="title" required onChange={(e) => handleUnitChange(index, e)} />
                <label htmlFor={`unitContent${index + 1}`} className="form-label">Contenido de la Unidad</label>
                <textarea className="form-control" id={`unitContent${index + 1}`} name="content" rows="3" required onChange={(e) => handleUnitChange(index, e)}></textarea>
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-secondary mb-3" onClick={addUnit}>Agregar Unidad</button>
          <button type="submit" className="btn btn-success">Guardar Curso</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/courses')}>Atrás</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CourseForm;
