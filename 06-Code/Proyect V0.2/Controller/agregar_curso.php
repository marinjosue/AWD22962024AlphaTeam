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

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id_course = isset($_POST['id_course']) ? $_POST['id_course'] : null;
    $name = $_POST['courseName'];
    $description = $_POST['courseDescription'];
    $category = $_POST['courseCategory'];
    $teacher = $_POST['courseTeacher'];
    $start = $_POST['courseStart'];
    $end = $_POST['courseEnd'];
    $price = $_POST['coursePrice'];
    $youtube = $_POST['courseYoutube'];

    if ($id_course) {
        // Actualizar curso existente
        $sql = "UPDATE courses SET course_name=?, course_description=?, id_category=?, user_id=?, start_date=?, end_date=?, price=?, course_youtube=? WHERE id_course=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssiiisdsi", $name, $description, $category, $teacher, $start, $end, $price, $youtube, $id_course);
    } else {
        // Crear curso nuevo
        $sql = "INSERT INTO courses (course_name, course_description, id_category, user_id, start_date, end_date, price, course_youtube) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssiiisds", $name, $description, $category, $teacher, $start, $end, $price, $youtube);
    }

    if ($stmt->execute()) {
        $course_id = $id_course ? $id_course : $stmt->insert_id;

        // Manejo de unidades
        if ($id_course) {
            $conn->query("DELETE FROM course_units WHERE id_course = $course_id");
        }

        $unitTitles = $_POST['unitTitles'];
        $unitContents = $_POST['unitContents'];
        $unitSQL = "INSERT INTO course_units (id_course, unit_title, unit_content) VALUES (?, ?, ?)";
        $unitStmt = $conn->prepare($unitSQL);

        foreach ($unitTitles as $index => $title) {
            $content = $unitContents[$index];
            $unitStmt->bind_param("iss", $course_id, $title, $content);
            $unitStmt->execute();
        }

        echo "Curso guardado exitosamente.";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
