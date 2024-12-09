<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "courses";
$port = "3306";

$conn = new mysqli($servername, $username, $password, $dbname, $port);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT id_course, course_name, course_description, start_date, end_date, price FROM courses WHERE status = 'activo'";
$result = $conn->query($sql);

$courses = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $courses[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($courses);

$conn->close();
?>
