<?php
require '../Connection/db.php'; // Tu archivo de conexión a la base de datos

$sql = "SELECT id_rol, roles FROM roles";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>{$row['id_rol']}</td>
                <td>{$row['roles']}</td>
                <td>
                    <button class='btn btn-warning btn-sm'><i class='fas fa-edit'></i> Editar</button>
                    <button class='btn btn-danger btn-sm'><i class='fas fa-trash'></i> Eliminar</button>
                </td>
              </tr>";
    }
} else {
    echo "<tr><td colspan='3'>No hay roles disponibles.</td></tr>";
}

$conn->close();
?>
