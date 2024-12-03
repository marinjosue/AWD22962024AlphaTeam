<?php
    // Conexión a la base de datos
    $servername = "boydpfeivqsyzxx4wzly-mysql.services.clever-cloud.com";
    $username = "ulltzlf06xa3hjip"; 
    $password = "n3BTQanxNlrJAlWCUlSA"; 
    $dbname = "boydpfeivqsyzxx4wzly"; // Nombre de la base de datos

    // Crear la conexión
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Verificar la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }
?>
