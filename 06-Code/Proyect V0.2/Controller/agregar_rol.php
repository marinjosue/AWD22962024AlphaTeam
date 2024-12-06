<?php
header('Content-Type: application/json');

// Configuración de la conexión a la base de datos
include '../Connection/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombreRol = $_POST['roles'] ?? '';

    if (!empty($nombreRol)) {
        try {
            $conexion = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8", $dbUser, $dbPass);
            $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Inserción del rol
            $query = "INSERT INTO roles (roles) VALUES (:nombreRol)";
            $stmt = $conexion->prepare($query);
            $stmt->bindParam(':nombreRol', $nombreRol, PDO::PARAM_STR);

            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Rol agregado exitosamente.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Error al agregar el rol.']);
            }
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Error de conexión: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'El nombre del rol es obligatorio.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}
?>
