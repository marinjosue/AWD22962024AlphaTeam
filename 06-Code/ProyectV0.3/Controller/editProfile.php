<?php
require '../connection/db.php';
session_start();  
$error_message = '';
$success_message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_usuario = $_POST['id'] ?? null;
    $first_name = $_POST['first_name'] ?? '';
    $last_name = $_POST['last_name'] ?? '';
    $email = $_POST['email'] ?? '';
    $address = $_POST['address'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $password = $_POST['password'] ?? '';
    $id_rol = $_POST['id_rol'] ?? '';


    if ($id_usuario) {
        $sql = "UPDATE users SET first_name = ?, last_name = ?, email = ?, address = ?, phone = ?, password = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ssssssi', $first_name, $last_name, $email, $address, $phone, $password, $id_usuario);

        if ($id_rol == 1) {
            $_SESSION['success_message'] = "Cambios realizados correctamente.";
            header("Location: ../viewadmin/Profile.html");
        } else {
            $_SESSION['success_message'] = "Cambios realizados correctamente.";
            header("Location: ../viewuser/ProfileUser.html");
        }
        
        
        $stmt->close();
    } else {
        $error_message = "ID de usuario no válido.";
    }
}

$id_usuario = $_GET['id'] ?? null;

if ($id_usuario) {
    $sql = "SELECT * FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id_usuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
    } else {
        echo "Usuario no encontrado";
        exit;
    }

    $stmt->close();
} else {
    echo "ID de usuario no proporcionado.";
    exit;
}

$conn->close();
?>