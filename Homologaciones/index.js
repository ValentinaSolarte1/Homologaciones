// Script para animar elementos cuando aparecen en el viewport
document.addEventListener('DOMContentLoaded', function () {
    const animateElements = document.querySelectorAll('.animate-fade-in');

    function checkIfInView() {
        animateElements.forEach(function (element) {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Asignar animación con delay para que sea secuencial
    animateElements.forEach(function (element, index) {
        element.style.animationDelay = (index * 0.2) + 's';
    });

    // Verificar posición inicial
    checkIfInView();

    // Verificar al hacer scroll
    window.addEventListener('scroll', checkIfInView);

    // Smooth scrolling para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para el header fijo
                    behavior: 'smooth'
                });
            }
        });
    });

    // Validación básica de formularios
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Aquí se añadiría la lógica para enviar el formulario
            alert('¡Mensaje enviado con éxito! Nos pondremos en contacto con usted lo antes posible.');
            this.reset();
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar elementos del DOM
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.setAttribute('aria-label', 'Abrir menú');

    const headerContainer = document.querySelector('.header-container');
    const navLinks = document.querySelector('.nav-links');

    // Insertar el botón de menú en el encabezado
    headerContainer.insertBefore(menuToggle, navLinks);

    // Agregar evento click al botón de menú
    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');

        // Cambiar el ícono y el aria-label según el estado
        if (navLinks.classList.contains('active')) {
            menuToggle.innerHTML = '✕';
            menuToggle.setAttribute('aria-label', 'Cerrar menú');
        } else {
            menuToggle.innerHTML = '☰';
            menuToggle.setAttribute('aria-label', 'Abrir menú');
        }
    });

    // Cerrar el menú al hacer clic en un enlace
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '☰';
            menuToggle.setAttribute('aria-label', 'Abrir menú');
        });
    });

    // Cerrar el menú al redimensionar la ventana a un tamaño más grande
    window.addEventListener('resize', function () {
        if (window.innerWidth > 480) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '☰';
            menuToggle.setAttribute('aria-label', 'Abrir menú');
        }
    });
});
