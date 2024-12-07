<?php
// Incluir el archivo de conexión
require '../Connection/db.php';

$response = ['success' => false, 'message' => '']; // Respuesta inicial

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Capturar los datos enviados desde el formulario
    $cedula = $_POST['cedula'] ?? '';
    $first_name = $_POST['first_name'] ?? '';
    $last_name = $_POST['last_name'] ?? '';
    $address = $_POST['address'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = !empty($_POST['password']) ? password_hash($_POST['password'], PASSWORD_DEFAULT) : ''; // Encriptar contraseña
    $gender = $_POST['gender'] ?? '';
    $role_id = $_POST['role'] ?? '';

    // Validar que los campos requeridos no estén vacíos
    if (!empty($cedula) && !empty($first_name) && !empty($last_name) && !empty($email) && !empty($password) && !empty($role_id)) {
        // Preparar la consulta SQL
        $sql = "INSERT INTO users (cedula, first_name, last_name, address, phone, email, password, gender, id_rol) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssssss", $cedula, $first_name, $last_name, $address, $phone, $email, $password, $gender, $role);

if ($stmt->execute()) {
    $response['success'] = true;
    $response['message'] = 'Usuario agregado correctamente';
} else {
    throw new Exception('Error al agregar el usuario: ' . $stmt->error);
}


            // Cerrar el statement
            $stmt->close();
        } else {
            $response['message'] = "Error al preparar la consulta: " . $conn->error;
        }
    } else {
        $response['message'] = "Todos los campos obligatorios deben ser completados.";
    }

    // Cerrar la conexión
    $conn->close();
} else {
    $response['message'] = "Método no permitido.";
}

// Devolver la respuesta como JSON
echo json_encode($response);
?>
