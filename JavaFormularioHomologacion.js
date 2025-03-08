let db;
let currentStep = 0;
const steps = document.querySelectorAll(".step");
const progressIndicators = document.querySelectorAll(".step-indicator");

// Inicializar IndexedDB
function initDB() {
    let request = indexedDB.open("HomologacionDB", 1);

    request.onupgradeneeded = function (event) {
        let db = event.target.result;
        if (!db.objectStoreNames.contains("usuarios")) {
            db.createObjectStore("usuarios", { keyPath: "id", autoIncrement: true });
        }
    };

    request.onsuccess = function (event) {
        db = event.target.result;
    };

    request.onerror = function () {
        console.log("Error al abrir la base de datos.");
    };
}

initDB();

// Validar solo números en identificación y teléfono
function validateNumber(input) {
    input.value = input.value.replace(/[^0-9]/g, "");
}
function checkIdentificationType() {
    const tipoIdentificacion = document.getElementById("tipo_identificacion").value;
    const extraDocs = document.getElementById("extra-docs");

    if (tipoIdentificacion === "TE") {
        extraDocs.classList.remove("hidden");
    } else {
        extraDocs.classList.add("hidden");
    }
}

function changeStep(step) {
    // Implementación para cambiar de paso (si es necesario)
}

function saveStep() {
    alert("Datos guardados correctamente");
}

function changeStep(step) {
    // Implementación para cambiar de paso (si es necesario)
}

function saveStep() {
    alert("Datos guardados correctamente");
}

// Validar correo electrónico con dominios permitidos
function validateEmail(input) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com|yahoo\.com)$/;
    if (!emailRegex.test(input.value.trim())) {
        alert("Correo inválido. Use un correo de Gmail, Hotmail, Outlook o Yahoo.");
        input.value = "";
        input.style.border = "2px solid red";
    } else {
        input.style.border = "";
    }
}

// Habilitar o deshabilitar el botón "Guardar y Continuar"

let intentoEnvio = false; // Variable para detectar si el usuario ya intentó enviar el formulario

function validateForm() {
    const campos = document.querySelectorAll(".step.active input[required], .step.active select[required], .step.active textarea[required]");
    const archivos = document.querySelectorAll(".step.active input[type='file'][required]");
    const btnSave = document.querySelector(".step.active .btn-save");
    let isValid = true;

    // Validación de inputs y selects
    campos.forEach(campo => {
        let error = false;

        // Si el usuario intentó enviar y el campo está vacío, marcar error
        if (intentoEnvio && campo.value.trim() === "") {
            error = true;
        }

        // Validar que número de identificación y teléfono contengan solo números
        if ((campo.id === "numero_identificacion" || campo.id === "telefono") && !/^\d+$/.test(campo.value.trim())) {
            error = true;
        }

        // Validar email con dominios permitidos
        if (campo.id === "email") {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com|yahoo\.com)$/;
            if (!emailRegex.test(campo.value.trim())) {
                error = true;
            }
        }

        // Verificar que el email de confirmación coincida con el email principal
        if (campo.id === "confirm_email") {
            const email = document.getElementById("email").value.trim();
            if (campo.value.trim() !== email) {
                error = true;
            }
        }

        // Aplicar borde rojo si hay error
        if (intentoEnvio) {
            campo.classList.toggle("input-error", error);
        }

        if (error) isValid = false;
    });

    // Validación de archivos (documentos requeridos)
    archivos.forEach(archivo => {
        let error = false;

        // Si el usuario intentó enviar y no ha subido un archivo, marcar error
        if (intentoEnvio && archivo.files.length === 0) {
            error = true;
        }

        // Aplicar borde rojo si hay error
        if (intentoEnvio) {
            archivo.classList.toggle("input-error", error);
        }

        if (error) isValid = false;
    });

    // Habilitar o deshabilitar el botón de guardar
    if (btnSave) {
        btnSave.disabled = !isValid;
    }

    return isValid;
}

// Evento para marcar que el usuario intentó enviar el formulario
document.querySelector(".btn-submit").addEventListener("click", function (event) {
    intentoEnvio = true; // Marcar que el usuario intentó enviar
    if (!validateForm()) {
        event.preventDefault(); // Evita el envío si hay errores
        alert("Por favor, complete todos los campos obligatorios.");
    }
});


function checkIdentificationType() {
    const tipoIdentificacion = document.getElementById("tipo_identificacion").value;
    const extraDocs = document.getElementById("extra-docs");

    // Obtener los campos de los documentos adicionales
    const apostilla = document.getElementById("apostilla_certificado");
    const visa = document.getElementById("copia_visa");
    const pasaporte = document.getElementById("copia_pasaporte");

    if (tipoIdentificacion === "TE") {
        // Mostrar documentos adicionales para extranjeros
        extraDocs.style.display = "block";

        // Hacerlos obligatorios
        apostilla.setAttribute("required", "true");
        visa.setAttribute("required", "true");
        pasaporte.setAttribute("required", "true");
    } else {
        // Ocultar documentos adicionales para no extranjeros
        extraDocs.style.display = "none";

        // Eliminar la obligatoriedad de los documentos adicionales
        apostilla.removeAttribute("required");
        visa.removeAttribute("required");
        pasaporte.removeAttribute("required");

        // Limpiar los valores de los campos cuando se ocultan
        apostilla.value = "";
        visa.value = "";
        pasaporte.value = "";

        // Quitar los bordes rojos si los documentos ya no son requeridos
        apostilla.classList.remove("input-error");
        visa.classList.remove("input-error");
        pasaporte.classList.remove("input-error");
    }
}


// Agregar el evento para detectar cambios en el tipo de identificación
document.getElementById("tipo_identificacion").addEventListener("change", checkIdentificationType);


// Guardar los datos y avanzar al siguiente paso
function saveStep() {
    const inputs = document.querySelectorAll(".step.active input, .step.active select");
    let isValid = true;
    let formData = {};

    inputs.forEach(input => {
        if (input.hasAttribute("required") && !input.value.trim()) {
            isValid = false;
            input.style.border = "2px solid red";
        } else {
            input.style.border = "";
            formData[input.id] = input.value.trim();
        }
    });

    if (formData.email !== formData.confirm_email) {
        alert("Los correos electrónicos no coinciden.");
        document.getElementById("confirm_email").style.border = "2px solid red";
        return;
    }

    if (!isValid) {
        alert("Por favor, completa todos los campos obligatorios antes de continuar.");
        return;
    }

    // Guardar en IndexedDB
    let transaction = db.transaction(["usuarios"], "readwrite");
    let store = transaction.objectStore("usuarios");
    let request = store.add(formData);

    request.onsuccess = function () {
        alert("Datos guardados con éxito.");
        changeStep(1);
    };

    request.onerror = function () {
        alert("Error al guardar los datos.");
    };
}

// Cambiar de paso en el formulario
function changeStep(stepChange) {
    steps[currentStep].classList.remove("active");
    progressIndicators[currentStep].classList.remove("active-indicator");

    currentStep += stepChange;

    steps[currentStep].classList.add("active");
    progressIndicators[currentStep].classList.add("active-indicator");

    validateForm(); // Verificar si el botón "Guardar y Continuar" debe estar habilitado
}

// Datos de departamentos y municipios de Colombia
const departamentosMunicipios = {
    "Antioquia": ["Medellín", "Bello", "Itagüí", "Envigado"],
    "Cundinamarca": ["Bogotá", "Soacha", "Zipaquirá", "Girardot"],
    "Valle del Cauca": ["Cali", "Palmira", "Buenaventura", "Tuluá"],
    "Atlántico": ["Barranquilla", "Soledad", "Malambo", "Puerto Colombia"],
    "Santander": ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta"],
    "Bolívar": ["Cartagena", "Magangué", "Turbaco", "Arjona"],
    "Nariño": ["Pasto", "Ipiales", "Tumaco", "Túquerres"],
    "Cauca": ["Popayán", "Santander de Quilichao", "Puerto Tejada", "Piendamó"]
};

function cargarDepartamentos() {
    const departamentoSelect = document.getElementById("departamento");
    Object.keys(departamentosMunicipios).forEach(departamento => {
        let option = document.createElement("option");
        option.value = departamento;
        option.textContent = departamento;
        departamentoSelect.appendChild(option);
    });
}

function updateMunicipios() {
    const municipioSelect = document.getElementById("municipio");
    const departamentoSelect = document.getElementById("departamento").value;

    municipioSelect.innerHTML = '<option value="">Seleccione un municipio</option>';
    if (departamentoSelect && departamentosMunicipios[departamentoSelect]) {
        departamentosMunicipios[departamentoSelect].forEach(municipio => {
            let option = document.createElement("option");
            option.value = municipio;
            option.textContent = municipio;
            municipioSelect.appendChild(option);
        });
    }
}

// Cargar departamentos y validar formulario al cargar la página
window.onload = function () {
    cargarDepartamentos();
    validateForm();
};

// Agregar eventos a los inputs para validar en tiempo real
document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll("input, select");
    inputs.forEach(input => {
        input.addEventListener("input", validateForm);
    });

    validateForm(); // Validar al cargar la página
}); // Correcciones en Java.js

// Función para actualizar las opciones de formación según la institución
function updateFormacion() {
    var institucion = document.getElementById("institucion").value;
    var tipoFormacion = document.getElementById("tipo_formacion");
    tipoFormacion.innerHTML = '<option value="">Seleccione</option>';

    var formaciones = {
        "SENA": ["Técnico", "Tecnólogo"],
        "FUP": ["Universitario"],
        "Colegio Mayor": ["Tecnólogo", "Universitario"]
    };

    if (formaciones[institucion]) {
        formaciones[institucion].forEach(function (tipo) {
            var option = document.createElement("option");
            option.value = tipo;
            option.textContent = tipo;
            tipoFormacion.appendChild(option);
        });
    }
}

// Función para actualizar carreras según la institución y el tipo de formación
function updateCarreras() {
    var institucion = document.getElementById("institucion").value;
    var tipoFormacion = document.getElementById("tipo_formacion").value;
    var carrera = document.getElementById("carrera");
    carrera.innerHTML = '<option value="">Seleccione</option>';

    var opciones = {
        "SENA": {
            "Técnico": ["Técnico en Sistemas", "Técnico en Programación de Software"],
            "Tecnólogo": ["Tecnólogo en Análisis y Desarrollo de Sistemas", "Tecnología en Gestión de Redes de Datos", "Tecnología en Desarrollo de Videojuegos"]
        },
        "FUP": {
            "Universitario": ["Ingeniería de Sistemas", "Ingeniería Industrial"]
        },
        "Colegio Mayor": {
            "Tecnólogo": ["Tecnólogo en Diseño Gráfico"],
            "Universitario": ["Ingeniería Informática", "Ingeniería de Sistemas", "Ingeniería Multimedia"]
        }
    };

    if (opciones[institucion] && opciones[institucion][tipoFormacion]) {
        opciones[institucion][tipoFormacion].forEach(function (nombre) {
            var option = document.createElement("option");
            option.value = nombre;
            option.textContent = nombre;
            carrera.appendChild(option);
        });
    }
}

// Función para actualizar materias según la carrera seleccionada
function updateMaterias() {
    var carrera = document.getElementById("carrera").value;
    var materiasContainer = document.getElementById("materias-container");
    materiasContainer.innerHTML = "";

    var materiasPorCarrera = {
        "Ingeniería de Sistemas": {
            "Semestre 1": ["Fundamentos de Programación", "Matemáticas I", "Introducción a la Ingeniería de Software", "Comunicación Oral y Escrita", "Electiva Sociohumanística I"],
            "Semestre 2": ["Estructuras de Datos", "Matemáticas II", "Arquitectura de Computadores", "Electiva de Contexto I"],
            "Semestre 3": ["Bases de Datos I", "Matemáticas Discretas", "Sistemas Operativos", "Electiva Sociohumanística II"],
            "Semestre 4": ["Ingeniería de Requisitos", "Bases de Datos II", "Redes de Computadores", "Electiva de Contexto II"],
            "Semestre 5": ["Diseño de Software", "Programación Web", "Gestión de Proyectos de Software", "Electiva Profesional I"],
            "Semestre 6": ["Pruebas y Calidad de Software", "Seguridad Informática", "Electiva Profesional II", "Electiva de Contexto III"],
            "Semestre 7": ["Arquitectura de Software", "Desarrollo de Aplicaciones Móviles", "Electiva Profesional III"],
            "Semestre 8": ["Seminario de Investigación", "Gestión de la Innovación en Software", "Electiva Profesional IV"],
            "Semestre 9": ["Trabajo de Grado", "Práctica Profesional"]
        },
        "Ingeniería Industrial": {
            "Semestre 1": ["Introducción a la Ingeniería Industrial", "Matemáticas I", "Física I", "Química General", "Comunicación Oral y Escrita"],
            "Semestre 2": ["Matemáticas II", "Física II", "Dibujo Técnico", "Fundamentos de Programación", "Electiva de Contexto I"],
            "Semestre 3": ["Estadística Descriptiva", "Mecánica", "Contabilidad General", "Electiva Sociohumanística I"],
            "Semestre 4": ["Estadística Inferencial", "Termodinámica", "Costos y Presupuestos", "Electiva de Contexto II"],
            "Semestre 5": ["Investigación de Operaciones I", "Electiva Profesional I", "Electiva Sociohumanística II"],
            "Semestre 6": ["Investigación de Operaciones II", "Electiva Profesional II", "Electiva de Contexto III"],
            "Semestre 7": ["Gestión de la Producción", "Electiva Profesional III"],
            "Semestre 8": ["Gestión de la Calidad", "Electiva Profesional IV"],
            "Semestre 9": ["Práctica Empresarial"],
            "Semestre 10": ["Trabajo de Grado"]
        },
        "Técnico en Sistemas": {
            "Semestre 1": ["Redes de Computadores", "Sistemas Operativos", "Soporte Técnico"],
            "Semestre 2": ["Bases de Datos", "Programación Web", "Seguridad Informática"],
            "Semestre 3": ["Desarrollo de Aplicaciones", "Virtualización de Servidores", "Gestión de Redes"],
            "Semestre 4": ["Administración de Servidores", "Ciberseguridad Básica", "Configuración de Firewalls"],
            "Semestre 5": ["Mantenimiento de Hardware", "Automatización de Procesos", "Implementación de VPNs"],
            "Semestre 6": ["Monitorización de Sistemas", "Gestión de Incidentes de Seguridad", "Diseño de Redes Empresariales"]
        },
        "Técnico en Programación de Software": {
            "Semestre 1": ["Desarrollo de Aplicaciones de Software", "Manejo de Lenguajes de Programación", "Fundamentos de Algoritmos"],
            "Semestre 2": ["Diseño de Interfaces Gráficas", "Pruebas de Software", "Implementación de Soluciones Informáticas"],
            "Semestre 3": ["Bases de Datos", "Arquitectura de Software", "Desarrollo Web"],
            "Semestre 4": ["Desarrollo de Aplicaciones Móviles", "Seguridad en el Desarrollo de Software", "Gestión de Proyectos de Software"]
        },
        "Tecnología en Desarrollo de Videojuegos": {
            "Semestre 1": ["Fundamentos de Programación en Videojuegos", "Diseño de Videojuegos", "Matemáticas para Gráficos"],
            "Semestre 2": ["Motores Gráficos", "Narrativa Interactiva", "Inteligencia Artificial en Juegos"],
            "Semestre 3": ["Diseño de Niveles", "Multijugador y Redes", "Optimización de Videojuegos"],
            "Semestre 4": ["Realidad Virtual y Aumentada", "Modelado y Animación 3D", "Proyecto Final de Videojuegos"]
        },

        "Tecnólogo en Diseño Gráfico": {
            "Semestre 1": ["Fundamentos del Diseño Gráfico", "Historia del Arte y el Diseño", "Técnicas de Ilustración Digital"],
            "Semestre 2": ["Tipografía y Diagramación", "Fotografía y Edición Digital", "Teoría del Color y Composición"],
            "Semestre 3": ["Diseño de Identidad Visual", "Producción Audiovisual", "Animación 2D y 3D"],
            "Semestre 4": ["Diseño Web y Experiencia de Usuario", "Marketing y Publicidad Digital", "Proyecto Final de Diseño Gráfico"]
        },
        "Ingeniería Multimedia": {
            "Semestre 1": ["Fundamentos de Diseño Multimedia", "Matemáticas y Lógica Computacional", "Programación Básica"],
            "Semestre 2": ["Edición y Producción Audiovisual", "Diseño de Interfaces y Experiencia de Usuario", "Animación Digital 2D"],
            "Semestre 3": ["Modelado y Animación 3D", "Narrativa Digital y Storytelling", "Desarrollo de Aplicaciones Interactivas"],
            "Semestre 4": ["Realidad Virtual y Aumentada", "Inteligencia Artificial en Medios Digitales", "Proyecto Final de Ingeniería Multimedia"]
        },
        "Ingeniería Informática": {
            "Semestre 1": ["Fundamentos de Programación", "Matemáticas Discretas", "Arquitectura de Computadores"],
            "Semestre 2": ["Estructuras de Datos", "Sistemas Operativos", "Bases de Datos I"],
            "Semestre 3": ["Redes de Computadores", "Programación Orientada a Objetos", "Ingeniería de Software"],
            "Semestre 4": ["Bases de Datos II", "Seguridad Informática", "Desarrollo Web"],
            "Semestre 5": ["Gestión de Proyectos de Software", "Inteligencia Artificial", "Computación en la Nube"],
            "Semestre 6": ["Arquitectura de Software", "Ciberseguridad", "Desarrollo de Aplicaciones Móviles"],
            "Semestre 7": ["Big Data y Analítica", "Internet de las Cosas", "Práctica Profesional I"],
            "Semestre 8": ["Computación Gráfica", "Blockchain y Criptografía", "Práctica Profesional II"],
            "Semestre 9": ["Trabajo de Grado I", "Ética Profesional", "Emprendimiento Tecnológico"],
            "Semestre 10": ["Trabajo de Grado II", "Innovación y Transformación Digital", "Electiva Profesional"]
        },
        "Tecnólogo en Análisis y Desarrollo de Sistemas": {
            "Semestre 1": ["Fundamentos de Programación", "Lógica de Programación", "Matemáticas Aplicadas", "Introducción a las Bases de Datos"],
            "Semestre 2": ["Estructuras de Datos", "Desarrollo Web Básico", "Programación Orientada a Objetos", "Modelado de Bases de Datos"],
            "Semestre 3": ["Desarrollo de Aplicaciones Móviles", "Bases de Datos Avanzadas", "Ingeniería de Software", "Redes y Comunicaciones"],
            "Semestre 4": ["Programación en la Nube", "Pruebas de Software", "Metodologías Ágiles", "Desarrollo Seguro de Aplicaciones"],
            "Semestre 5": ["Inteligencia Artificial Básica", "Seguridad Informática", "Administración de Sistemas Operativos", "Análisis de Datos"],
            "Semestre 6": ["Big Data", "Gestión de Proyectos de Software", "Emprendimiento en TIC", "Trabajo de Grado"]
        },

        "Tecnología en Gestión de Redes de Datos": {
            "Semestre 1": ["Fundamentos de Redes", "Sistemas Operativos", "Matemáticas para TI", "Fundamentos de Programación"],
            "Semestre 2": ["Administración de Redes", "Protocolos de Comunicación", "Bases de Datos", "Seguridad en Redes"],
            "Semestre 3": ["Configuración de Servidores", "Redes Inalámbricas", "Programación en Redes", "Gestión de Proyectos TIC"],
            "Semestre 4": ["Monitoreo y Diagnóstico de Redes", "Infraestructura Cloud", "Seguridad Avanzada en Redes", "Ética y Legislación TIC"],
            "Semestre 5": ["Automatización de Redes", "Gestión de Servicios en la Nube", "Administración de Data Centers", "Trabajo de Grado"]
        }

    }
        ;

    if (materiasPorCarrera[carrera]) {
        Object.keys(materiasPorCarrera[carrera]).forEach(function (semestre) {
            var semestreDiv = document.createElement("div");
            semestreDiv.innerHTML = `<h4>${semestre}</h4>`;
            materiasContainer.appendChild(semestreDiv);

            materiasPorCarrera[carrera][semestre].forEach(function (materia, index) {
                var inputId = `materia_${semestre}_${index}`;

                var materiaRow = document.createElement("div");
                materiaRow.innerHTML = `
                    <label>${materia}:</label>
                    <input type="number" id="${inputId}" min="0" max="5" step="0.1" placeholder="Ingrese nota" class="nota-input">
                    <input type="checkbox" id="check_${inputId}" onchange="toggleNoAplica('${inputId}')"> No Aplica
                `;
                materiasContainer.appendChild(materiaRow);
            });
        });
    }
}

// Función para habilitar o deshabilitar el input de nota si se marca "No Aplica"
function toggleNoAplica(inputId) {
    var notaInput = document.getElementById(inputId);
    var checkBox = document.getElementById(`check_${inputId}`);

    if (checkBox.checked) {
        notaInput.value = "";
        notaInput.disabled = true;
    } else {
        notaInput.disabled = false;
    }
}

// Función para mostrar ventana de confirmación



// Función para enviar el formulario después de la confirmación
function enviarFormulario() {
    alert("Formulario enviado con éxito.");
    document.getElementById("multi-step-form").submit();
}
function toggleFechaFinalizacion() {
    var finalizo = document.getElementById("finalizo_estudios").value;
    var fechaFinalizacionContainer = document.getElementById("fecha_finalizacion_container");
    var fechaUltimoSemestreContainer = document.getElementById("fecha_ultimo_semestre_container");

    if (finalizo === "si") {
        // Si finalizó, mostramos la fecha de finalización y ocultamos la del último semestre
        fechaFinalizacionContainer.style.display = "block";
        fechaUltimoSemestreContainer.style.display = "none";
        document.getElementById("fecha_ultimo_semestre").value = "";
    } else if (finalizo === "no") {
        // Si no finalizó, mostramos la fecha del último semestre y ocultamos la de finalización
        fechaFinalizacionContainer.style.display = "none";
        fechaUltimoSemestreContainer.style.display = "block";
        document.getElementById("fecha_finalizacion").value = "";
    } else {
        // Si no se ha seleccionado nada, ocultamos ambos campos
        fechaFinalizacionContainer.style.display = "none";
        fechaUltimoSemestreContainer.style.display = "none";
        document.getElementById("fecha_finalizacion").value = "";
        document.getElementById("fecha_ultimo_semestre").value = "";
    }
}// Función para mostrar la ventana de confirmación antes de enviar el formulario
function mostrarConfirmacion() {
    const modal = document.getElementById("modal-confirmacion");
    const datosConfirmacion = document.getElementById("datos-confirmacion");

    // Obtener datos del formulario
    const tipoId = document.getElementById("tipo_identificacion").value || "No especificado";
    const numId = document.getElementById("numero_identificacion").value || "No especificado";
    const nombre = (document.getElementById("primer_nombre").value || "") + " " + (document.getElementById("segundo_nombre").value || "");
    const apellido = (document.getElementById("primer_apellido").value || "") + " " + (document.getElementById("segundo_apellido").value || "");
    const email = document.getElementById("email").value || "No especificado";
    const telefono = document.getElementById("telefono").value || "No especificado";
    const direccion = document.getElementById("direccion").value || "No especificado";
    const departamento = document.getElementById("departamento").value || "No especificado";
    const municipio = document.getElementById("municipio").value || "No especificado";
    const institucion = document.getElementById("institucion").value || "No especificado";
    const formacion = document.getElementById("tipo_formacion").value || "No especificado";
    const carrera = document.getElementById("carrera").value || "No especificado";

    // Mostrar los datos en la ventana emergente
    datosConfirmacion.innerHTML = `
        <p><strong>Tipo de Identificación:</strong> ${tipoId}</p>
        <p><strong>Número de Identificación:</strong> ${numId}</p>
        <p><strong>Nombre Completo:</strong> ${nombre.trim()} ${apellido.trim()}</p>
        <p><strong>Correo Electrónico:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Dirección:</strong> ${direccion}</p>
        <p><strong>Departamento:</strong> ${departamento}</p>
        <p><strong>Municipio:</strong> ${municipio}</p>
        <p><strong>Institución de Origen:</strong> ${institucion}</p>
        <p><strong>Tipo de Formación:</strong> ${formacion}</p>
        <p><strong>Carrera:</strong> ${carrera}</p>
    `;

    // Mostrar modal de confirmación
    modal.style.display = "flex";
}

// Función para confirmar la solicitud y generar el radicado
function confirmarSolicitud() {
    // Generar número de radicado en formato HOM-2025-XXXX
    const año = new Date().getFullYear();
    const numeroSecuencia = Math.floor(Math.random() * 9000) + 1000; // Número aleatorio de 4 dígitos
    const numeroRadicado = `HOM-${año}-${numeroSecuencia}`;

    // Mostrar en el modal de radicado
    document.getElementById("numero-radicado").innerText = numeroRadicado;

    // Cerrar modal de confirmación y abrir el de radicado
    document.getElementById("modal-confirmacion").style.display = "none";
    document.getElementById("modal-radicado").style.display = "flex";
}

// Función para cerrar cualquier modal abierto
function cerrarModal() {
    document.getElementById("modal-confirmacion").style.display = "none";
    document.getElementById("modal-radicado").style.display = "none";
}

// Función para enviar el formulario después de confirmar el radicado
function enviarFormulario() {
    alert("Formulario enviado con éxito.");
    document.getElementById("multi-step-form").submit();
}
// Función para mostrar las materias de homologación si elige Ingeniería de Software
function mostrarMateriasHomologar() {
    let carreraDestino = document.getElementById("carrera_destino").value;
    let contenedorMaterias = document.getElementById("materias-homologar-container");
    let contenedorComentarios = document.getElementById("comentarios-container");
    let listaMaterias = document.getElementById("materias-homologar");

    // Vaciar el contenido previo
    listaMaterias.innerHTML = "";

    // Mostrar solo si elige Ingeniería de Software
    if (carreraDestino === "ingenieria_software") {
        contenedorMaterias.style.display = "block";
        contenedorComentarios.style.display = "block"; // Mostrar comentarios

        let materiasSoftware = [
            "Fundamentos de Programación",
            "Estructuras de Datos",
            "Bases de Datos",
            "Sistemas Operativos",
            "Programación Web",
            "Ingeniería de Software",
            "Redes de Computadores",
            "Seguridad Informática",
            "Desarrollo de Aplicaciones Móviles",
            "Inteligencia Artificial",
            "Computación en la Nube"
        ];

        materiasSoftware.forEach((materia, index) => {
            let inputId = `materia_${index}`;
            let materiaRow = document.createElement("div");
            materiaRow.classList.add("materia-row");

            materiaRow.innerHTML = `
                <label class="materia-label">${materia}</label>
                <label class="switch">
                    <input type="checkbox" id="${inputId}" name="materias_homologar" value="${materia}" onchange="toggleMateria('${inputId}')">
                    <span class="slider"></span>
                </label>
            `;
            listaMaterias.appendChild(materiaRow);
        });
    } else {
        contenedorMaterias.style.display = "none";
        contenedorComentarios.style.display = "none";
    }
}

// Función para cambiar el color del contenedor cuando se activa una materia
function toggleMateria(id) {
    let checkbox = document.getElementById(id);
    let materiaRow = checkbox.closest(".materia-row");

    if (checkbox.checked) {
        materiaRow.classList.add("materia-seleccionada");
    } else {
        materiaRow.classList.remove("materia-seleccionada");
    }
}
// Función para cargar las materias según la carrera seleccionada
function cargarMaterias(carrera) {
    var materiasContainer = document.getElementById("materiasContainer");
    materiasContainer.innerHTML = ""; // Limpiar el contenedor

    if (materiasPorCarrera[carrera]) {
        Object.keys(materiasPorCarrera[carrera]).forEach(function (semestre) {
            var semestreDiv = document.createElement("div");
            semestreDiv.innerHTML = `<h4>${semestre}</h4>`;
            materiasContainer.appendChild(semestreDiv);

            materiasPorCarrera[carrera][semestre].forEach(function (materia, index) {
                var inputId = `materia_${semestre}_${index}`;

                var materiaRow = document.createElement("div");
                materiaRow.innerHTML = `
                    <label>${materia}:</label>
                    <input type="number" id="${inputId}" min="0" max="5" step="0.1" placeholder="Ingrese nota" 
                           class="nota-input" oninput="verificarNota(this)">
                    <input type="checkbox" id="check_${inputId}" onchange="toggleNoAplica('${inputId}')"> No Aplica
                `;
                materiasContainer.appendChild(materiaRow);
            });
        });
    }
}

// Función para activar/desactivar "No Aplica" con un slider
function toggleNoAplica(inputId) {
    var notaInput = document.getElementById(inputId);
    var switchInput = document.getElementById(`switch_${inputId}`);
    var materiaRow = document.getElementById(`row_${inputId}`);

    if (switchInput.checked) {
        notaInput.value = "";
        notaInput.disabled = true;
        materiaRow.classList.add('materia-seleccionada'); // Cambia color del contenedor
    } else {
        notaInput.disabled = false;
        materiaRow.classList.remove('materia-seleccionada'); // Quita color si se desactiva
    }
}


// Función para verificar y cambiar el color de la nota según el valor
function verificarNota(input) {
    const valor = parseFloat(input.value);

    // Remover clases existentes
    input.classList.remove('reprobado', 'aprobado');

    // Solo aplicar clase si el valor es un número válido
    if (!isNaN(valor)) {
        if (valor >= 0.0 && valor < 3.0) {
            input.classList.add('reprobado');
        } else if (valor >= 3.0 && valor <= 5.0) {
            input.classList.add('aprobado');
        }
    }
}

// Función para inicializar los eventos en las notas ya existentes
function inicializarEventosNotas() {
    const notaInputs = document.querySelectorAll('.nota-input');

    notaInputs.forEach(input => {
        // Verificar el color al cargar la página
        verificarNota(input);

        // Si no tiene ya un listener de eventos, agregarlo
        if (!input.hasAttribute('data-initialized')) {
            input.setAttribute('data-initialized', 'true');
            input.addEventListener('input', function () {
                verificarNota(this);
            });
        }
    });
}

// Llamar a la función de inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    inicializarEventosNotas();
});