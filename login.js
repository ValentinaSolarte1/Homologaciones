document.addEventListener('DOMContentLoaded', function () {
    // Toggle para mostrar/ocultar contraseña
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('active'); // Opcional: cambiar icono
        });
    }

    // Efecto de enfoque en los inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            this.parentElement.classList.remove('focused');
        });
    });
});

function handleLogin() {
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('error-message');
    const loginBtn = document.getElementById('login-btn');

    // Reset del mensaje de error
    errorMessage.style.display = 'none';

    console.log(`Intentando login con: ${email} / ${password}`);

    // Validación de campos vacíos
    if (!email || !password) {
        errorMessage.textContent = 'Por favor complete todos los campos.';
        errorMessage.style.display = 'block';
        return;
    }

    // Simulación de autenticación con diferentes roles
    if (email === 'aspirante@gmail.com' && password === 'Aspirante123') {
        console.log('Login exitoso: Redirigiendo...');
        simulateLogin('formularioHomologacion.html');
    } else {
        console.log('Error: Usuario o contraseña incorrectos');
        errorMessage.textContent = 'Correo o contraseña incorrectos. Intente nuevamente.';
        errorMessage.style.display = 'block';

        // Agregar animación de error al botón
        loginBtn.classList.add('error');
        setTimeout(() => {
            loginBtn.classList.remove('error');
        }, 1000);
    }
}

function simulateLogin(redirectUrl) {
    const loginBtn = document.getElementById('login-btn');
    loginBtn.textContent = 'INGRESANDO...';
    loginBtn.disabled = true;

    setTimeout(() => {
        window.location.href = redirectUrl;
    }, 1500);
}

// Función para redirigir a la página de registro
function redirectToRegister() {
    window.location.href = 'formulario_Registro_Usuarios.html';
}
