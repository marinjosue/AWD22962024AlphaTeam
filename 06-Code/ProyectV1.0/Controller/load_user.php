<?php
require '../connection/db.php';  

$response = ['success' => false, 'data' => []];

try {
    $sql = "SELECT id, cedula, first_name, last_name, address, phone, email, password, gender, id_rol FROM users";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $usuarios = [];
        while ($row = $result->fetch_assoc()) {
            $usuarios[] = [
                'id' => $row['id'],
                'cedula' => $row['cedula'],
                'first_name' => $row['first_name'],
                'last_name' => $row['last_name'],
                'address' => $row['address'],
                'phone' => $row['phone'],
                'email' => $row['email'],
                'password' => $row['password'],
                'gender' => $row['gender'],
                'id_rol' => $row['id_rol']
            ];
        }

        $response['success'] = true;
        $response['data'] = $usuarios;
    } else {
        $response['message'] = 'No se encontraron usuarios.';
    }
} catch (Exception $e) {
    $response['message'] = 'Error al obtener usuarios: ' . $e->getMessage();
}

echo json_encode($response);

$conn->close();
?>
