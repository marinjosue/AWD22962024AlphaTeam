<?php
require '../connection/db.php';

$response = ['success' => false, 'message' => ''];  
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $roles = $_POST['roles'];

    if (!empty($roles)) {
       
        $sql = "INSERT INTO roles (roles) VALUES (?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $roles);

        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = "Rol agregado correctamente";
        } else {
            $response['message'] = "Error al agregar el rol: " . $conn->error;
        }

        $stmt->close();
    } else {
        $response['message'] = "El nombre del rol es obligatorio.";
    }

    $conn->close();
} else {
    $response['message'] = "Método no permitido.";
}

echo json_encode($response);
?>
