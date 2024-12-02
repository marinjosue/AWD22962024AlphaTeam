<?php
require '../Connection/db.php'; // Archivo de conexión

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_rol = $_POST['id_rol'];
    $roles = $_POST['roles'];

    $sql = "UPDATE roles SET roles = ? WHERE id_rol = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $roles, $id_rol);

    if ($stmt->execute()) {
        echo "Rol actualizado correctamente";
    } else {
        echo "Error al actualizar el rol: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>
