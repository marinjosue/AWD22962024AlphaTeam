import React, { useEffect, useState } from 'react';
import AdminHeader from '../../components/AdminHeader';
import Footer from '../../components/Footer';
import '../../styles/users.css';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://ec2-3-15-222-198.us-east-2.compute.amazonaws.com:3000/api/users2');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch('http://ec2-3-15-222-198.us-east-2.compute.amazonaws.com:3000/api/roles');
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error('Error cargando roles:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const deleteUser = async (userId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;
    try {
      const response = await fetch(`http://ec2-3-15-222-198.us-east-2.compute.amazonaws.com:3000/api/users2/${userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const result = await response.json();
      if (result.success) {
        alert('Usuario eliminado correctamente');
        fetchUsers();
      } else {
        alert('Error al eliminar el usuario: ' + result.message);
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const getRoleName = (roleId) => {
    const role = roles.find(r => r.id_rol === roleId);
    return role ? role.roles : 'N/A';
  };

  const editUser = (userId) => {
    window.location.href = `/admin/updateUser?id=${userId}`;
  };

  return (
    <div>
      <AdminHeader />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Gestionar Usuarios</h1>
        <input type="text" id="searchInput" className="form-control" placeholder="Buscar por ID Usuario o Nombre" onChange={(e) => {
          const filter = e.target.value.toLowerCase();
          const filtered = users.filter(user =>
            user.id.toString().includes(filter) || (user.first_name + ' ' + user.last_name).toLowerCase().includes(filter)
          );
          setUsers(filtered);
        }} />
        <br />
        <div className="table-responsive">
          <table className="table table-bordered table-hover" id="usersTable">
            <thead className="table-dark">
              <tr>
                <th>ID Usuario</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="usersBody">
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.first_name} {user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{getRoleName(user.id_rol)}</td>
                  <td>
                    <button className="btn btn-warning btn-sm" onClick={() => editUser(user.id)}>
                      <i className="fas fa-edit"></i> Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}>
                      <i className="fas fa-trash"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Users;
