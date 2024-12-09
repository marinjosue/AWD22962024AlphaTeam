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

$sql = "SELECT c.id_course, c.course_name, c.course_description, c.start_date, c.end_date, c.price, c.cedula,
               c.id_category, c.status, c.course_youtube, cu.id_unit, cu.unit_title, cu.unit_content
        FROM courses c
        LEFT JOIN course_units cu ON c.id_course = cu.id_course";

$result = $conn->query($sql);

$courses = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $id_course = $row['id_course'];
        if (!isset($courses[$id_course])) {
            $courses[$id_course] = [
                'course_name' => $row['course_name'],
                'course_description' => $row['course_description'],
                'start_date' => $row['start_date'],
                'end_date' => $row['end_date'],
                'price' => $row['price'],
                'cedula' => $row['cedula'],
                'id_category' => $row['id_category'],
                'status' => $row['status'],
                'course_youtube' => $row['course_youtube'],
                'units' => []
            ];
        }
        if ($row['id_unit']) {
            $courses[$id_course]['units'][] = [
                'unit_title' => $row['unit_title'],
                'unit_content' => $row['unit_content']
            ];
        }
    }
}

header('Content-Type: application/json');
echo json_encode($courses);

$conn->close();
?>
