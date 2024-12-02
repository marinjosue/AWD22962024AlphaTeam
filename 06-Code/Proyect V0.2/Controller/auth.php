<?php
// Incluir el archivo de conexión
require_once('../connection/db.php');

// Obtener datos del formulario
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// Validar datos ingresados
if (empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Por favor ingresa todos los campos']);
    exit;
}

// Consulta para verificar el usuario y contraseña
$sql = "SELECT users.id, users.first_name, users.last_name, users.password, roles.roles 
        FROM users 
        INNER JOIN roles ON users.id_rol = roles.id_rol 
        WHERE users.email = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();

// Validar si el usuario existe
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Verificar contraseña
    if (password_verify($password, $user['password'])) {
        echo json_encode([
            'success' => true,
            'message' => 'Inicio de sesión exitoso',
            'role' => $user['roles']
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Contraseña incorrecta']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
}

$conn->close();
?>
