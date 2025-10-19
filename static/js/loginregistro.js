// Cambiar entre formularios de login y registro
function switchForm(form) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');

    if (form === 'login') {
        // Mostrar login, ocultar registro
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');

        // Cambiar colores de pestañas
        loginTab.classList.add('text-palees-yellow');
        loginTab.classList.remove('text-palees-blue');
        registerTab.classList.add('text-palees-blue');
        registerTab.classList.remove('text-palees-yellow');
    } else {
        // Mostrar registro, ocultar login
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');

        // Cambiar colores de pestañas
        registerTab.classList.add('text-palees-yellow');
        registerTab.classList.remove('text-palees-blue');
        loginTab.classList.add('text-palees-blue');
        loginTab.classList.remove('text-palees-yellow');
    }
}

// Simulación de envío de formularios (debería ser reemplazado por lógica real)
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const messageArea = document.getElementById('message-area');

    const handleSubmit = (event, formName) => {
        event.preventDefault();
        messageArea.classList.remove(
            'hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700'
        );

        // Simulación de éxito
        messageArea.classList.add('bg-green-100', 'text-green-700');
        if (formName === 'login') {
            messageArea.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Inicio de sesión exitoso. Redirigiendo...';
        } else {
            messageArea.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Registro exitoso. ¡Bienvenido a Palees!';
        }

        console.log(`Formulario ${formName} enviado.`);
        // setTimeout(() => window.location.href = '/', 2000); // Redirección simulada
    };

    loginForm.addEventListener('submit', (e) => handleSubmit(e, 'login'));
    registerForm.addEventListener('submit', (e) => handleSubmit(e, 'register'));

    // Mantener el contador del carrito en la navegación
    const count = localStorage.getItem('cartCount') || 0;
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.textContent = count;
});
