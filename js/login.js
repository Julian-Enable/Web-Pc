document.addEventListener("DOMContentLoaded", function () {
    var loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Obtener datos del registro
            const user = JSON.parse(localStorage.getItem('user'));
            console.log(user);

            if (user && user.email === email && user.password === password) {
                alert('Inicio de sesión exitoso!');
                window.location.href = 'index.html';  // Redirigir a la página principal
            } else {
                alert('Correo electrónico o contraseña incorrectos.');
            }
        });
    }
});