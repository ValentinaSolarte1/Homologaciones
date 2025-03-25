
// Función para mostrar notificaciones
function showNotification() {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto"><i class="bi bi-bell-fill me-2"></i>Notificación</strong>
            <small>Ahora</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
            <p>Su proceso de homologación ha sido completado con éxito.</p>
            <p class="mb-0">Puede consultar los detalles en la sección de homologaciones.</p>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Eliminar el toast después de 5 segundos
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// Función para cerrar sesión
function logout() {
    if (confirm('¿Está seguro que desea cerrar sesión?')) {
        // Aquí iría la lógica de cerrar sesión
        alert('Sesión cerrada exitosamente');
        // Redirigir a la página de inicio de sesión
         window.location.href = 'index.html';
    }
}

// Función para guardar cambios en el perfil
function saveProfileChanges() {
    // Aquí iría la lógica para guardar los cambios
    $('#editProfileModal').modal('hide');
    
    // Mostrar notificación
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto"><i class="bi bi-check-circle-fill me-2 text-success"></i>Éxito</strong>
            <small>Ahora</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
            Los datos del perfil han sido actualizados correctamente.
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Eliminar el toast después de 5 segundos
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// Inicializar tooltips
document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
