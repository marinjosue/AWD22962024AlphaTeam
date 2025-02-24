// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa tus vistas
import Login from './pages/views/Login';
import Register from './pages/views/Register';
import UpdateUser from './pages/views/UpdateUser';
import ViewCourses from './pages/views/ViewCourses';
import Contact from './pages/views/Contact';

// Área Admin
import AdminProfile from './pages/admin/Profile';
import Courses from './pages/admin/Courses';
import CourseForm from './pages/admin/CourseForm';
import CourseData from './pages/admin/CourseData';
import Report from './pages/admin/Report';
import Users from './pages/admin/Users';

// Área Usuario
import ProfileUser from './pages/user/ProfileUser';
import CoursesEnrolled from './pages/user/CoursesEnrolled';

function App() {
  return (
    <BrowserRouter>
      {/* Opcional: Puedes definir un layout general con Header y Footer aquí */}
      <Routes>
        {/* Rutas públicas / vistas generales */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/updateUser" element={<UpdateUser />} />
        <Route path="/viewCourses" element={<ViewCourses />} />
        <Route path="/contact" element={<Contact />} />

        {/* Rutas del área de administración */}
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/courses" element={<Courses />} />
        <Route path="/admin/course/new" element={<CourseForm />} />
        <Route path="/admin/course/:id" element={<CourseData />} />
        <Route path="/admin/report" element={<Report />} />
        <Route path="/admin/users" element={<Users />} />

        {/* Rutas del área de usuario */}
        <Route path="/user/profile" element={<ProfileUser />} />
        <Route path="/user/coursesEnrolled" element={<CoursesEnrolled />} />

        {/* Ruta por defecto */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
