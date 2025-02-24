import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function AppRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage-courses" element={<h1>Gestionar Cursos</h1>} />
        <Route path="/manage-users" element={<h1>Gestionar Usuarios</h1>} />
        <Route path="/report" element={<h1>Reporte</h1>} />
        <Route path="/my-courses" element={<h1>Mis Cursos</h1>} />
        <Route path="/admin-profile" element={<h1>Perfil Admin</h1>} />
        <Route path="/user-profile" element={<h1>Perfil Usuario</h1>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default AppRouter;
