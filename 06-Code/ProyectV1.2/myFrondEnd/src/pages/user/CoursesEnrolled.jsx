import React, { useEffect, useState } from 'react';
import UserHeader from '../../components/UserHeader';
import Footer from '../../components/Footer';
import '../../styles/CoursesEnrolled.css';

const CoursesEnrolled = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Simula la carga o haz fetch a la API
    const enrolledCourses = [
      {
        title: 'Técnicas de Masajes Relajantes',
        progress: 80,
        description: 'Aprende técnicas para realizar masajes relajantes de manera profesional.'
      },
      {
        title: 'Masajes Terapéuticos',
        progress: 50,
        description: 'Curso avanzado para tratar dolores musculares mediante masajes terapéuticos.'
      },
      {
        title: 'Aromaterapia y Bienestar',
        progress: 30,
        description: 'Descubre cómo usar aceites esenciales en combinación con masajes para mejorar la salud.'
      }
    ];
    setCourses(enrolledCourses);
  }, []);

  return (
    <div>
      <UserHeader />
      <main className="container my-5">
        <h2 className="text-center mb-4">Cursos Inscritos</h2>
        <div id="courses" className="row">
          {courses.map((course, index) => (
            <div key={index} className="col-md-6 course-card">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <div className="progress mb-2">
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: `${course.progress}%` }} aria-valuenow={course.progress} aria-valuemin="0" aria-valuemax="100">
                      {course.progress}%
                    </div>
                  </div>
                  <button className="btn btn-primary btn-sm">Continuar Curso</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoursesEnrolled;
