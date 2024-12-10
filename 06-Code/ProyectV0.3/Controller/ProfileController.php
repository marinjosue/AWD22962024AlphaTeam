<?php
require_once('../connection/db.php');
session_start();


if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'No autenticado']);
    exit;
}

$user_id = $_SESSION['user_id'];

$sql = "SELECT users.id,users.cedula, users.first_name, users.last_name, users.email, users.phone, roles.roles 
        FROM users 
        INNER JOIN roles ON users.id_rol = roles.id_rol 
        WHERE users.id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $user_id); 
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode(['user' => $user]);
} else {
    echo json_encode(['error' => 'Usuario no encontrado']);
}

$conn->close();
?>
