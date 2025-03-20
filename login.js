document.addEventListener('DOMContentLoaded', function() {
    // Toggle para mostrar/ocultar contraseña
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.textContent = type === 'password' ? '🔒' : '👁️';
    });
    
    // Validación del formulario
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const documento = document.getElementById('documento').value;
        const password = document.getElementById('password').value;
        
        // Reset del mensaje de error
        errorMessage.style.display = 'none';
        
        // Validación básica
        if (documento.trim() === '' || password.trim() === '') {
            errorMessage.textContent = 'Por favor complete todos los campos.';
            errorMessage.style.display = 'block';
            return;
        }
        
        // Simulación de autenticación (aquí se conectaría con el backend)
        if (documento === '123456789' && password === 'admin123') {
            // Login exitoso - redirigir a la página de homologaciones
            simulateLogin();
        } else {
            // Login fallido
            errorMessage.textContent = 'Documento o contraseña incorrectos. Intente nuevamente.';
            errorMessage.style.display = 'block';
            
            // Agregar animación de error
            loginForm.querySelector('.login-btn').classList.add('error');
            setTimeout(() => {
                loginForm.querySelector('.login-btn').classList.remove('error');
            }, 1000);
        }
    });
    
    // Simulación de login exitoso
    function simulateLogin() {
        // Cambiar el texto del botón
        const loginBtn = loginForm.querySelector('.login-btn');
        loginBtn.textContent = 'INGRESANDO...';
        loginBtn.disabled = true;
        
        // Simular carga
        setTimeout(() => {
            // Alerta de éxito
            alert('¡Inicio de sesión exitoso! Redirigiendo al sistema de homologaciones.');
            
            // Reiniciar formulario (en un sistema real, se redireccionaría)
            loginBtn.textContent = 'INGRESAR';
            loginBtn.disabled = false;
            loginForm.reset();
        }, 1500);
    }
    
    // Efecto de enfoque en los inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
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
    });
});
