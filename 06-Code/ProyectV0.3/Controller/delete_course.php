<?php
require '../connection/db.php';
$data = json_decode(file_get_contents('php://input'), true);
$id = isset($data['id']) ? intval($data['id']) : 0;

if ($id <= 0) {
    echo json_encode(['error' => 'ID del curso inválido.']);
    exit;
}

$sql_units = "DELETE FROM course_units WHERE id_course = ?";
$stmt_units = $conn->prepare($sql_units);
$stmt_units->bind_param("i", $id);
$stmt_units->execute();

$sql_course = "DELETE FROM courses WHERE id_course = ?";
$stmt_course = $conn->prepare($sql_course);
$stmt_course->bind_param("i", $id);
$stmt_course->execute();

if ($stmt_course->affected_rows > 0) {
    echo json_encode(['success' => 'Curso eliminado correctamente.']);
} else {
    echo json_encode(['error' => 'No se pudo eliminar el curso.']);
}

$stmt_units->close();
$stmt_course->close();
$conn->close();
?>
