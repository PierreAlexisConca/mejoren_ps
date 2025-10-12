//loginregistro.js
function switchForm(formType) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');

    if (formType === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
    } else if (formType === 'register') {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
    }
}

// Simulación de envío de formularios (debería ser reemplazado por lógica de autenticación real)
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const messageArea = document.getElementById('message-area');

    const handleSubmit = (event, formName) => {
        event.preventDefault();
        messageArea.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700');

        // Simulación de éxito
        messageArea.classList.add('bg-green-100', 'text-green-700');
        if (formName === 'login') {
            messageArea.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Inicio de sesión exitoso. Redirigiendo...';
        } else {
            messageArea.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Registro exitoso. ¡Bienvenido a Palees!';
        }

        // En un entorno real, aquí iría el fetch() a tu API o Firebase Auth
        console.log(`Formulario ${formName} enviado.`);
        // setTimeout(() => window.location.href = '/', 2000); // Redirección simulada
    };

    loginForm.addEventListener('submit', (e) => handleSubmit(e, 'login'));
    registerForm.addEventListener('submit', (e) => handleSubmit(e, 'register'));

    // Dummy para el carrito (mantener el contador en la navegación)
    const count = localStorage.getItem('cartCount') || 0;
    const countEl = document.getElementById('cart-count');
    if (countEl) {
        countEl.textContent = count;
    }
});
