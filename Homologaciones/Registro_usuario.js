
document.getElementById("ayudaLink").addEventListener("click", function (event) {
    event.preventDefault(); // Evita que el enlace se comporte como uno normal
    window.location.href = 'login.html';
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registroForm');
    const email = document.getElementById('email');
    const confirmEmail = document.getElementById('confirmEmail');
    const errorMessage = document.getElementById('errorMessage');
    const ayudaLink = document.getElementById('ayudaLink');
    const contactoLink = document.getElementById('contactoLink');

    // Validar el formulario antes de enviar
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validar que los correos coincidan
        if (email.value !== confirmEmail.value) {
            errorMessage.style.display = 'block';
            errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Los correos electrónicos no coinciden.';
            return;
        }

        // Validar el formato del correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            errorMessage.style.display = 'block';
            errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> El formato del correo electrónico no es válido.';
            return;
        }

        // Validar que se haya seleccionado un tipo de documento
        const tipoDocumento = document.getElementById('tipoDocumento');
        if (tipoDocumento.value === "") {
            errorMessage.style.display = 'block';
            errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Debe seleccionar un tipo de documento.';
            return;
        }

        // Validar que el número de documento tenga al menos 5 caracteres
        const numeroDocumento = document.getElementById('numeroDocumento');
        if (numeroDocumento.value.length < 5) {
            errorMessage.style.display = 'block';
            errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> El número de documento debe tener al menos 5 caracteres.';
            return;
        }

        // Validar reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (recaptchaResponse.length === 0) {
            errorMessage.style.display = 'block';
            errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Por favor, complete el reCAPTCHA.';
            return;
        }

        // Si todo está correcto, mostrar mensaje de éxito
        Swal.fire({
            title: 'Registro Exitoso',
            text: 'Su solicitud ha sido registrada correctamente. Recibirá información en su correo electrónico.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0075bf'
        }).then((result) => {
            // Resetear el formulario
            form.reset();
            grecaptcha.reset();
            errorMessage.style.display = 'none';
        });
    });

    // Ocultar mensaje de error cuando se modifica algún campo
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            errorMessage.style.display = 'none';
        });
    });

    // Enlaces de ayuda
    ayudaLink.addEventListener('click', function (e) {
        e.preventDefault();
        Swal.fire({
            title: 'Ayuda',
            html: `
                <div style="text-align: left;">
                    <p><strong>¿Cómo funciona el proceso de homologación?</strong></p>
                    <p>1. Complete este formulario con sus datos.</p>
                    <p>2. Recibirá un correo con instrucciones para subir sus documentos.</p>
                    <p>3. La universidad evaluará su solicitud y le notificará el resultado.</p>
              
                </div>
            `,
            icon: 'info',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#0075bf'
        });
    });
});
