<?php
// Incluir el archivo de conexión
require_once '../Connection/db.php'; 

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Capturar los datos enviados desde el formulario
    $cedula = $_POST['cedula'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $address = $_POST['address'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Encriptar la contraseña
    $gender = $_POST['gender'];
    $role_id = $_POST['role'];

    // Preparar la consulta SQL
    $sql = "INSERT INTO users (cedula, first_name, last_name, address, phone, email, password, gender, id_rol) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Preparar la consulta utilizando `mysqli`
    if ($stmt = $conn->prepare($sql)) {
        // Asociar los parámetros
        $stmt->bind_param("ssssssssi", $cedula, $first_name, $last_name, $address, $phone, $email, $password, $gender, $role_id);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Usuario agregado correctamente.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al agregar el usuario: ' . $stmt->error]);
        }

        // Cerrar el statement
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al preparar la consulta: ' . $conn->error]);
    }

    // Cerrar la conexión
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}
?>
