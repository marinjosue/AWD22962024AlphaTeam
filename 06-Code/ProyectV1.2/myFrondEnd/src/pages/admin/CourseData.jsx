import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader';
import Footer from '../../components/Footer';
import '../../styles/courses.css';

const API_URL = 'http://ec2-3-15-222-198.us-east-2.compute.amazonaws.com:3000/api/courses';

const transformYoutubeUrl = (url) => {
  try {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get('v');
    return `https://www.youtube.com/embed/${videoId}`;
  } catch (error) {
    return '';
  }
};

const CourseData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    if (!id) {
      alert('No se ha seleccionado un curso.');
      navigate('/admin/courses');
      return;
    }
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Error al obtener los detalles del curso');
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error('Error al obtener los detalles del curso:', error);
        alert('Hubo un error al cargar los detalles del curso.');
        navigate('/admin/courses');
      }
    };
    fetchCourseDetails();
  }, [id, navigate]);

  return (
    <div>
      <AdminHeader />
      <div className="container mt-5">
        {course ? (
          <>
            <h1 id="courseTitle" className="text-center">{course.course_name}</h1>
            <p id="courseDescription" className="text-center">{course.course_description}</p>
            <h3 className="mt-4">Video del Curso</h3>
            <div className="text-center">
              <iframe 
                id="courseVideo" 
                width="560" 
                height="315" 
                src={transformYoutubeUrl(course.course_youtube)}
                frameBorder="0" 
                allowFullScreen
                title="Video del Curso"
              ></iframe>
            </div>
            <h3 className="mt-4">Unidades del Curso</h3>
            <div id="courseUnits" className="mt-3">
              {course.units && course.units.length > 0 ? (
                course.units.map((unit, index) => (
                  <div key={index}>
                    <h4>{unit.unit_title}</h4>
                    <p>{unit.unit_content}</p>
                  </div>
                ))
              ) : (
                <p>No hay unidades asociadas a este curso.</p>
              )}
            </div>
            <button className="btn btn-primary mt-4" onClick={() => navigate('/admin/courses')}>Regresar</button>
          </>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CourseData;
