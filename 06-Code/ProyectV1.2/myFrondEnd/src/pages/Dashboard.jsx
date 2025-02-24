import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role) {
      navigate("/login"); // Si no hay usuario autenticado, redirige al login
    } else {
      setUserRole(role);
    }
  }, [navigate]);

  return (
    <div className="container mt-4">
      <h1>Bienvenido al Dashboard</h1>
      {userRole === "admin" ? (
        <AdminDashboard />
      ) : userRole === "user" ? (
        <UserDashboard />
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div>
      <h2>Panel de Administración</h2>
      <ul>
        <li><a href="/manage-courses">Gestionar Cursos</a></li>
        <li><a href="/manage-users">Gestionar Usuarios</a></li>
        <li><a href="/report">Generar Reportes</a></li>
      </ul>
    </div>
  );
};

const UserDashboard = () => {
  return (
    <div>
      <h2>Panel de Usuario</h2>
      <ul>
        <li><a href="/my-courses">Ver Cursos Inscritos</a></li>
        <li><a href="/user-profile">Editar Perfil</a></li>
      </ul>
    </div>
  );
};

export default Dashboard;
