function toggleInfo(id) {
    var element = document.getElementById(id + '-card');
    if (element.style.display === 'none' || element.style.display === '') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}

function toggleMenu() {
    var nav = document.getElementById('navbar');
    nav.classList.toggle('show');
}

