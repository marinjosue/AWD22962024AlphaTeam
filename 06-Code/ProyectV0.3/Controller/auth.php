<?php
require_once('../connection/db.php');

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Por favor ingresa todos los campos']);
    exit;
}

$sql = "SELECT users.id, users.first_name, users.last_name, users.password, roles.roles 
        FROM users 
        INNER JOIN roles ON users.id_rol = roles.id_rol 
        WHERE users.cedula = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username); 
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if ($password === $user['password']) {
        session_start(); 
        $_SESSION['user_id'] = $user['id']; 
        $_SESSION['role'] = $user['roles']; 
        
        echo json_encode([
            'success' => true,
            'message' => 'Inicio de sesión exitoso',
            'role' => $user['roles'],
            'id' => $user['id'], 
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Contraseña incorrecta']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
}

$conn->close();
?>
