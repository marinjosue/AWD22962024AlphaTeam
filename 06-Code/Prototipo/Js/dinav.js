function loadHTML(elementId, filePath, callback) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            if (callback) callback(); // Llama al callback si existe
        })
        .catch(error => console.error('Error loading HTML:', error));
}

// Ruta corregida para header y footer
loadHTML('header', '../Partials/header.html', () => {
    const hamburger = document.getElementById("hamburger");
    const navbar = document.getElementById("navbar");

    if (hamburger && navbar) {
        hamburger.addEventListener("click", () => {
            navbar.classList.toggle("show"); // Alterna la clase "show"
        });
    }
});

loadHTML('footer', '../Partials/footer.html');
