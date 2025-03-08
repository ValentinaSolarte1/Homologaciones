
document.addEventListener('DOMContentLoaded', function () {
    // Toggle para mostrar/ocultar contraseña
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.textContent = type === 'password' ? '' : '';
    });

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

    // Animación para las burbujas de fondo
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(bubble => {
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${Math.random() * 10 + 5}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
    });
});

function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    const loginBtn = document.getElementById('login-btn');

    // Reset del mensaje de error
    errorMessage.style.display = 'none';

    // Validación básica
    if (email.trim() === '' || password.trim() === '') {
        errorMessage.textContent = 'Por favor complete todos los campos.';
        errorMessage.style.display = 'block';
        return;
    }

    // Simulación de autenticación con diferentes roles
    if (email === 'aspirante@gmail.com' && password === 'Aspirante123') {
        // Usuario Aspirante
        simulateLogin('formularioHomologacion.html');
    } else {
        // Login fallido
        errorMessage.textContent = 'Correo o contraseña incorrectos. Intente nuevamente.';
        errorMessage.style.display = 'block';

        // Agregar animación de error
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

// Animación para las burbujas de fondo
const bubbles = document.querySelectorAll('.bubble');
bubbles.forEach(bubble => {
    // Posición inicial aleatoria
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${Math.random() * 10 + 5}s`;
    bubble.style.animationDelay = `${Math.random() * 5}s`;
    // Función para redirigir a la página de registro
function redirectToRegister() {
    window.location.href = 'formulario_Registro_Usuarios.html';}
});
