document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulación de almacenamiento de datos
    localStorage.setItem('user', JSON.stringify({ username, email, password }));
    alert('Usuario registrado con éxito!');
    window.location.href = 'login.html'; // Redirigir al inicio de sesión
});