<?php
require '../Connection/db.php'; // Conexión a la base de datos
session_start(); // Iniciar sesión para manejar mensajes de estado

// Inicializar variables de mensajes
$error_message = '';
$success_message = '';

// Si el formulario fue enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cedula = $_POST['cedula'] ?? '';
    $first_name = $_POST['first_name'] ?? '';
    $last_name = $_POST['last_name'] ?? '';
    $email = $_POST['email'] ?? '';
    $address = $_POST['address'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $password = $_POST['password'] ?? '';
    $id_rol = $_POST['id_rol'] ?? '';

    // Validar campos requeridos
    if (empty($cedula) || empty($first_name) || empty($last_name) || empty($email) || empty($address) || empty($phone) || empty($password) || empty($id_rol)) {
        $error_message = "Por favor, complete todos los campos.";
    } else {
        // Hashear la contraseña
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Preparar la consulta SQL para insertar un nuevo usuario
        $sql = "INSERT INTO users (cedula, first_name, last_name, email, address, phone, password, id_rol) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('sssssssi', $cedula, $first_name, $last_name, $email, $address, $phone, $hashed_password, $id_rol);

        if ($stmt->execute()) {
            // Si la inserción fue exitosa
            $success_message = "Usuario añadido correctamente.";
        } else {
            $error_message = "Error al añadir usuario: " . $conn->error;
        }

        $stmt->close();
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Añadir Usuario</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    <style>
        body {
            background-color: #f0f2f5;
            font-family: 'Arial', sans-serif;
        }

        .container {
            margin-top: 50px;
        }

        .card {
            border-radius: 10px;
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
        }

        .card-header {
            background-color: #4e73df;
            color: white;
            border-radius: 10px 10px 0 0;
        }

        .form-control {
            border-radius: 10px;
        }

        .form-group label {
            font-weight: 600;
            color: #333;
        }

        .btn-primary {
            background-color: #4e73df;
            border-color: #4e73df;
            border-radius: 5px;
            padding: 10px 20px;
        }

        .btn-primary:hover {
            background-color: #2e59d9;
            border-color: #2e59d9;
        }

        .alert {
            margin-top: 20px;
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="card-header text-center">
                <h4>Añadir Usuario</h4>
            </div>
            <div class="card-body">
                <?php if ($error_message): ?>
                    <div class="alert alert-danger" role="alert">
                        <?php echo $error_message; ?>
                    </div>
                <?php endif; ?>

                <?php if ($success_message): ?>
                    <div class="alert alert-success" role="alert">
                        <?php echo $success_message; ?>
                    </div>
                <?php endif; ?>

                <form method="POST" action="añadir_usuario.php">
                    <div class="mb-3">
                        <label for="cedula" class="form-label">Cédula:</label>
                        <input type="text" name="cedula" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="first_name" class="form-label">Nombre:</label>
                        <input type="text" name="first_name" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="last_name" class="form-label">Apellido:</label>
                        <input type="text" name="last_name" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">Correo:</label>
                        <input type="email" name="email" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="address" class="form-label">Dirección:</label>
                        <input type="text" name="address" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="phone" class="form-label">Teléfono:</label>
                        <input type="text" name="phone" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Contraseña:</label>
                        <input type="password" name="password" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="id_rol" class="form-label">Rol:</label>
                        <input type="text" name="id_rol" class="form-control" required>
                    </div>

                    <div class="text-center">
                        <button type="submit" class="btn btn-primary">Añadir Usuario</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>
