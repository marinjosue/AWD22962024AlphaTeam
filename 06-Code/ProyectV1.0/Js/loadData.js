function handleLogout() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas cerrar la sesión?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem('userRole', 'default');
            localStorage.removeItem('username');
            Swal.fire({
                title: '¡Sesión cerrada!',
                text: 'Has cerrado sesión exitosamente',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = '../index/index.html';
            });
        }
    });
}

function loadProfile() {
    fetch('../controller/ProfileController.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                Swal.fire({
                    title: 'Error',
                    text: data.error,
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = '../index/index.html';
                });
            } else {
                const user = data.user;
                document.getElementById('fullName').textContent = user.first_name + ' ' + user.last_name;
                document.getElementById('role').textContent = user.roles;
                document.getElementById('id').value = user.cedula;
                document.getElementById('email').value = user.email;
                document.getElementById('phone').value = user.phone;
                const photoUrl = `../imgprofile/${user.cedula}.png?timestamp=${new Date().getTime()}`;
                document.getElementById('photo').src = photoUrl;
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al cargar el perfil.',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false
            });
        });
}

window.onload = loadProfile;