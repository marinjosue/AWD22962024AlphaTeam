<?php

include('../connection/db.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $cedula = $_POST['cedula'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $address = $_POST['address'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $gender = $_POST['gender'];
    $id_rol = $_POST['role']; 
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (cedula, first_name, last_name, address, phone, email, password, gender, id_rol)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("ssssssssi", $cedula, $first_name, $last_name, $address, $phone, $email, $hashed_password, $gender, $id_rol);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Usuario agregado correctamente.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al agregar el usuario.']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al preparar la consulta.']);
    }

    $conn->close();

} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no válido.']);
}
?>
