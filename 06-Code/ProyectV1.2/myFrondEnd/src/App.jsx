// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Vistas públicas (views)
import Home from './pages/views/Home';
import Login from './pages/views/Login';
import Register from './pages/views/Register';
import UpdateUser from './pages/views/UpdateUser';
import ViewCourses from './pages/views/ViewCourses';
import Contact from './pages/views/Contact';

// Área de administración
import Profile from './pages/admin/Profile';
import Courses from './pages/admin/Courses';
import CourseForm from './pages/admin/CourseForm';
import CourseData from './pages/admin/CourseData';
import Report from './pages/admin/Report';
import Users from './pages/admin/Users';

// Área de usuario
import ProfileUser from './pages/user/ProfileUser';
import CoursesEnrolled from './pages/user/CoursesEnrolled';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de inicio: Home con header y footer */}
        <Route path="/" element={<Home />} />

        {/* Vistas públicas adicionales */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/updateUser" element={<UpdateUser />} />
        <Route path="/viewCourses" element={<ViewCourses />} />
        <Route path="/contact" element={<Contact />} />

        {/* Área de administración */}
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/courses" element={<Courses />} />
        <Route path="/admin/course/new" element={<CourseForm />} />
        <Route path="/admin/course/:id" element={<CourseData />} />
        <Route path="/admin/report" element={<Report />} />
        <Route path="/admin/users" element={<Users />} />

        {/* Área de usuario */}
        <Route path="/user/profile" element={<ProfileUser />} />
        <Route path="/user/coursesEnrolled" element={<CoursesEnrolled />} />

        {/* Ruta por defecto */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
