<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestionar Usuarios</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <!-- FontAwesome -->
    <script src="https://kit.fontawesome.com/c4033be41c.js" crossorigin="anonymous"></script>
</head>
<style>
    body {
        padding-top: 80px;
    }
</style>
<body>
    <div id="header"></div>
    <script src="../Js/dinav.js"></script>
    <!-- Contenedor Principal -->
    <div class="container mt-5">
        <h1 class="text-center mb-4">Gestionar Usuarios</h1>

        <!-- Navegación entre roles y usuarios -->
        <ul class="nav nav-tabs" id="gestionUsuariosTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="roles-tab" data-bs-toggle="tab" data-bs-target="#roles" type="button"
                    role="tab" aria-controls="roles" aria-selected="true">Gestionar Roles</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="usuarios-tab" data-bs-toggle="tab" data-bs-target="#usuarios" type="button"
                    role="tab" aria-controls="usuarios" aria-selected="false">Gestionar Usuarios</button>
            </li>
        </ul>

        <!-- Contenido de las pestañas -->
        <div class="tab-content" id="gestionUsuariosContent">
            <!-- Gestión de Roles -->
            <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>ID Rol</th>
                        <th>Nombre del Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    require '../Connection/db.php'; // Archivo de conexión
                    $sql = "SELECT id_rol, roles FROM roles";
                    $result = $conn->query($sql);

                    if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            echo "<tr>
                                    <td>{$row['id_rol']}</td>
                                    <td>{$row['roles']}</td>
                                    <td>
                                        <button class='btn btn-warning btn-sm'><i class='fas fa-edit'></i> Editar</button>
                                        <button class='btn btn-danger btn-sm'><i class='fas fa-trash'></i> Eliminar</button>
                                    </td>
                                  </tr>";
                        }
                    } else {
                        echo "<tr><td colspan='3'>No hay roles disponibles.</td></tr>";
                    }

                    $conn->close();
                    ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modal para Editar Rol -->
    <div class="modal fade" id="editRoleModal" tabindex="-1" aria-labelledby="editRoleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editRoleModalLabel">Editar Rol</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <form id="editRoleForm">
                        <input type="hidden" id="editRoleId" name="id_rol">
                        <div class="mb-3">
                            <label for="editRoleName" class="form-label">Nombre del Rol</label>
                            <input type="text" class="form-control" id="editRoleName" name="roles" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>

    <!-- JavaScript para Manejar Eventos -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const editButtons = document.querySelectorAll('.btn-warning');

            editButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const row = this.closest('tr');
                    const id = row.cells[0].innerText;
                    const name = row.cells[1].innerText;

                    document.getElementById('editRoleId').value = id;
                    document.getElementById('editRoleName').value = name;

                    const editModal = new bootstrap.Modal(document.getElementById('editRoleModal'));
                    editModal.show();
                });
            });

            document.getElementById('editRoleForm').addEventListener('submit', function (event) {
                event.preventDefault();

                const formData = new FormData(this);

                fetch('../Controller/editar_rol.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.text())
                .then(data => {
                    alert('Rol actualizado correctamente');
                    location.reload();
                })
                .catch(error => console.error('Error:', error));
            });
        });
    </script>
            <!-- Gestión de Usuarios -->
            <div class="tab-pane fade mt-4" id="usuarios" role="tabpanel" aria-labelledby="usuarios-tab">
                <h3>Gestionar Usuarios</h3>
                <div class="table-responsive">
                    <table class="table table-bordered table-hover">
                        <thead class="table-dark">
                            <tr>
                                <th>ID Usuario</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Cursos Inscritos</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Juan Pérez</td>
                                <td>juan.perez@example.com</td>
                                <td>
                                    <button class="btn btn-info btn-sm">
                                        <i class="fas fa-eye"></i> Ver Cursos (5)
                                    </button>
                                </td>
                                <td>
                                    <button class="btn btn-warning btn-sm"><i class="fas fa-edit"></i> Editar</button>
                                    <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i> Eliminar</button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>María Gómez</td>
                                <td>maria.gomez@example.com</td>
                                <td>
                                    <button class="btn btn-info btn-sm">
                                        <i class="fas fa-eye"></i> Ver Cursos (3)
                                    </button>
                                </td>
                                <td>
                                    <button class="btn btn-warning btn-sm"><i class="fas fa-edit"></i> Editar</button>
                                    <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i> Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <a href="/Views/Register.html" class="btn btn-primary mt-3"><i class="fas fa-plus"></i> Añadir Nuevo Usuario</a>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
        <div id="footer"></div>
</body>

</html>
