<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <title>CRUD Cursos</title>
</head>
<body>
    <div class="container mt-5">
        <h1 class="text-center">Agregar o Editar Curso</h1>
        <form action="save_course.php" method="post">
            <!-- ID del curso (oculto para edición) -->
            <input type="hidden" name="id_course" id="id_course">

            <!-- Campos del curso -->
            <div class="mb-3">
                <label for="courseName" class="form-label">Nombre del Curso</label>
                <input type="text" class="form-control" id="courseName" name="courseName" required>
            </div>
            <div class="mb-3">
                <label for="courseDescription" class="form-label">Descripción</label>
                <textarea class="form-control" id="courseDescription" name="courseDescription" rows="3" required></textarea>
            </div>
            <div class="mb-3">
                <label for="courseStart" class="form-label">Fecha de Inicio</label>
                <input type="date" class="form-control" id="courseStart" name="courseStart" required>
            </div>
            <div class="mb-3">
                <label for="courseEnd" class="form-label">Fecha de Fin</label>
                <input type="date" class="form-control" id="courseEnd" name="courseEnd" required>
            </div>
            <div class="mb-3">
                <label for="coursePrice" class="form-label">Precio</label>
                <input type="number" class="form-control" id="coursePrice" name="coursePrice" required>
            </div>
            <div class="mb-3">
                <label for="courseYoutube" class="form-label">Enlace de Video de YouTube</label>
                <input type="url" class="form-control" id="courseYoutube" name="courseYoutube" placeholder="https://youtube.com/..." required>
            </div>

            <!-- Unidades del curso -->
            <h3>Unidades</h3>
            <div id="unitsContainer" class="mb-4">
                <!-- Plantilla inicial para una unidad -->
                <div class="unit">
                    <label for="unitTitle1" class="form-label">Título de la Unidad</label>
                    <input type="text" class="form-control" id="unitTitle1" name="unitTitles[]" required>
                    <label for="unitContent1" class="form-label">Contenido de la Unidad</label>
                    <textarea class="form-control" id="unitContent1" name="unitContents[]" rows="3" required></textarea>
                </div>
            </div>
            <button type="button" class="btn btn-secondary mb-3" onclick="addUnit()">Agregar Unidad</button>

            <!-- Botones de acción -->
            <button type="submit" class="btn btn-success">Guardar Curso</button>
        </form>
    </div>

    <script>
        let unitCount = 1;
        function addUnit() {
            unitCount++;
            const container = document.getElementById('unitsContainer');
            const unitHTML = `
                <div class="unit">
                    <label for="unitTitle${unitCount}" class="form-label">Título de la Unidad</label>
                    <input type="text" class="form-control" id="unitTitle${unitCount}" name="unitTitles[]" required>
                    <label for="unitContent${unitCount}" class="form-label">Contenido de la Unidad</label>
                    <textarea class="form-control" id="unitContent${unitCount}" name="unitContents[]" rows="3" required></textarea>
                </div>`;
            container.insertAdjacentHTML('beforeend', unitHTML);
        }
    </script>
</body>
</html>
