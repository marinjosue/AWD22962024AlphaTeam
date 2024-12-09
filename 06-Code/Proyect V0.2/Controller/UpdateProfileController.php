<?php
require '../Connection/db.php';

session_start();

// Inicializar las variables de error y éxito
$error_message = '';
$success_message = '';

// Obtener el ID del usuario desde el parámetro GET o POST
$id_usuario = $_GET['id'] ?? null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_usuario = $_POST['id'] ?? null;
    $first_name = $_POST['first_name'] ?? '';
    $last_name = $_POST['last_name'] ?? '';
    $email = $_POST['email'] ?? '';
    $address = $_POST['address'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $password = $_POST['password'] ?? '';
    $cedula = $_POST['cedula'] ?? ''; // Nueva variable para cédula

    if ($id_usuario) {
        // Procesar la carga de la imagen
        if (!empty($_FILES['profile_image']['name'])) {
            $upload_dir = '../imgProfile/';
            $target_file = $upload_dir . $cedula . '.png';
            
            if (move_uploaded_file($_FILES['profile_image']['tmp_name'], $target_file)) {
                $success_message = "Imagen de perfil actualizada correctamente.";
            } else {
                $error_message = "Error al cargar la imagen.";
            }
        }

        // Actualizar los datos del usuario
        $sql = "UPDATE users SET first_name = ?, last_name = ?, email = ?, address = ?, phone = ?, password = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ssssssi', $first_name, $last_name, $email, $address, $phone, $password, $id_usuario);

        if ($stmt->execute()) {
            $_SESSION['success_message'] = "Cambios realizados correctamente.";
            header("Location: ../ViewAdmin/Profile.html");
            exit;
        } else {
            $error_message = "Error al actualizar el usuario: " . $conn->error;
        }
        
        $stmt->close();
    } else {
        $error_message = "ID de usuario no válido.";
    }
}

// Obtener datos del usuario
if ($id_usuario) {
    $sql = "SELECT * FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id_usuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
    } else {
        echo "Usuario no encontrado.";
        exit;
    }

    $stmt->close();
} else {
    echo "ID de usuario no proporcionado.";
    exit;
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Usuario</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header bg-primary text-white text-center">
                <h4>Editar Usuario</h4>
            </div>
            <div class="card-body">
                <?php if ($error_message): ?>
                    <div class="alert alert-danger"><?php echo $error_message; ?></div>
                <?php endif; ?>
                <?php if ($success_message): ?>
                    <div class="alert alert-success"><?php echo $success_message; ?></div>
                <?php endif; ?>

                <form method="POST" action="editar_usuario.php" enctype="multipart/form-data">
                    <input type="hidden" name="id" value="<?= $user['id'] ?>">
                    <input type="hidden" name="cedula" value="<?= $user['cedula'] ?>">

                    <div class="mb-3">
                        <label for="first_name" class="form-label">Nombre:</label>
                        <input type="text" name="first_name" class="form-control" value="<?= $user['first_name'] ?>" required>
                    </div>

                    <div class="mb-3">
                        <label for="last_name" class="form-label">Apellido:</label>
                        <input type="text" name="last_name" class="form-control" value="<?= $user['last_name'] ?>" required>
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">Correo:</label>
                        <input type="email" name="email" class="form-control" value="<?= $user['email'] ?>" required>
                    </div>

                    <div class="mb-3">
                        <label for="address" class="form-label">Dirección:</label>
                        <input type="text" name="address" class="form-control" value="<?= $user['address'] ?>" required>
                    </div>

                    <div class="mb-3">
                        <label for="phone" class="form-label">Teléfono:</label>
                        <input type="text" name="phone" class="form-control" value="<?= $user['phone'] ?>" required>
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Contraseña:</label>
                        <input type="text" name="password" class="form-control" value="<?= $user['password'] ?>" required>
                    </div>

                    <div class="mb-3">
                        <label for="profile_image" class="form-label">Actualizar Foto de Perfil:</label>
                        <input type="file" name="profile_image" class="form-control" accept=".png">
                    </div>

                    <div class="text-center">
                        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                    </div><br>
                    <div class="text-center">
                        <a href="../ViewAdmin/Profile.html" class="btn btn-secondary">Cancelar</a>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
