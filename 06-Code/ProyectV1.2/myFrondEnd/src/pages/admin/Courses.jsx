import React, { useEffect, useState } from 'react';
import AdminHeader from '../../components/AdminHeader';
import Footer from '../../components/Footer';
import '../../styles/courses.css';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://ec2-3-15-222-198.us-east-2.compute.amazonaws.com:3000/api/courses';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const viewCourse = (courseId) => {
    navigate(`/admin/course/${courseId}`);
  };

  const deleteCourse = async (courseId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este curso?')) return;
    try {
      const response = await fetch(`${API_URL}/${courseId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const result = await response.json();
      if (result.message) {
        alert(result.message);
        fetchCourses();
      } else {
        alert('Error al eliminar el curso');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Hubo un error al intentar eliminar el curso.');
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="container mt-5">
        <h1>Gestión de Cursos</h1>
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="coursesTableBody">
              {courses.map(course => (
                <tr key={course.id_course}>
                  <td>{course.id_course}</td>
                  <td>{course.course_name}</td>
                  <td>{course.start_date}</td>
                  <td>{course.end_date}</td>
                  <td>${course.price}</td>
                  <td>
                    <button className="btn btn-info btn-sm" onClick={() => viewCourse(course.id_course)}>Ver Curso</button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteCourse(course.id_course)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success mt-3" onClick={() => navigate('/admin/course/new')}>Añadir Nuevo Curso</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
