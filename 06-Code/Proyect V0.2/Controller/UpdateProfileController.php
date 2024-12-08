<?php
// Incluir archivo de configuración de la base de datos
require_once '../Connection/db.php';

// Comprobar si la solicitud es POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Obtener datos enviados
        $fullName = $_POST['fullName'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $profileImage = $_FILES['profileImage'] ?? null;

        // Validar datos básicos
        if (empty($fullName) || empty($email) || empty($phone)) {
            echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
            exit;
        }

        // Validar formato de correo
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['success' => false, 'message' => 'Correo electrónico no válido.']);
            exit;
        }

        // Manejar subida de imagen
        $imagePath = null;
        if ($profileImage && $profileImage['error'] === UPLOAD_ERR_OK) {
            $uploadDir = '../uploads/profile_pictures/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }

            $fileName = uniqid() . '_' . basename($profileImage['name']);
            $targetFilePath = $uploadDir . $fileName;

            if (move_uploaded_file($profileImage['tmp_name'], $targetFilePath)) {
                $imagePath = 'uploads/profile_pictures/' . $fileName;
            } else {
                echo json_encode(['success' => false, 'message' => 'Error al subir la imagen.']);
                exit;
            }
        }

        // Actualizar datos en la base de datos
        $userId = 1; // Cambiar por el ID del usuario autenticado (puedes obtenerlo de la sesión, por ejemplo)
        $conn = getDatabaseConnection();

        $query = "UPDATE users SET first_name = ?, email = ?, phone = ?, profile_picture = ? WHERE id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('ssssi', $fullName, $email, $phone, $imagePath, $userId);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => true, 'message' => 'Perfil actualizado correctamente.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'No se realizaron cambios en el perfil.']);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }
}
