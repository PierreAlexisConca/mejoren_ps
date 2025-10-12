// Módulo de productos y carrito: products.js
const products = [
    { id: 1, name: "Polo Básico Pima", color: "Amarillo Sol", originalPrice: 59.90, price: 44.92, discount: "25%", imgSrc: "/static/images/polo-amarillo.jpg" },
    { id: 2, name: "Polo Gráfico Urbano", color: "Diseño: Minimal", originalPrice: 79.00, price: 55.30, discount: "30%", imgSrc: "/static/images/polo-azul.jpg" },
    { id: 3, name: "Polo Piqué Textura", color: "Tejido de Lujo", originalPrice: 89.90, price: 53.94, discount: "40%", imgSrc: "/static/images/polo-negro.jpg" },
    { id: 4, name: "Polo Oversize", color: "Corte relajado", originalPrice: 65.50, price: 52.40, discount: "20%", imgSrc: "/static/images/polo-gris.jpg" },
    { id: 5, name: "Polo en Rojo Coral", color: "Coloración intensa", originalPrice: 59.90, price: 44.92, discount: "25%", imgSrc: "/static/images/polo-rojo.jpg" },
    { id: 6, name: "Polo Logo Discreto", color: "Blanco puro", originalPrice: 69.90, price: 45.44, discount: "35%", imgSrc: "/static/images/polo-blanco.jpg" },
    { id: 7, name: "Polo Cuello V Premium", color: "Verde Esmeralda", originalPrice: 75.00, price: 52.50, discount: "30%", imgSrc: "/static/images/polo-verde.jpg" },
    { id: 8, name: "Polo de Manga Larga", color: "Gris Oscuro", originalPrice: 99.90, price: 59.94, discount: "40%", imgSrc: "/static/images/polo-gris-oscuro.jpg" },
    { id: 9, name: "Polo Retro Stripes", color: "Estampado Rayas", originalPrice: 85.00, price: 63.75, discount: "25%", imgSrc: "/static/images/polo-rayas.jpg" },
    { id: 10, name: "Polo Sin Mangas Sport", color: "Azul Marino", originalPrice: 49.90, price: 34.93, discount: "30%", imgSrc: "/static/images/polo-sport.jpg" }
];
// --- ESTADO DEL CARRITO ---
let cart = window.cart?.getItems() || [];

// --- PAGINATION STATE ---
const productsPerPage = 4;
let currentPage = 1;

// Function to calculate total pages
const getTotalPages = () => Math.ceil(products.length / productsPerPage);

// --- UTILIDADES ---
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(amount);
};

const cartPanel = document.getElementById('cart-panel');
const cartOverlay = document.getElementById('cart-overlay');
const cartCountEl = document.getElementById('cart-count');
const cartMessageBox = document.getElementById('cart-message-box');

/**
 * Muestra/Oculta el panel lateral del carrito y el overlay.
 */
window.toggleCart = () => {
    const isOpen = cartPanel.classList.contains('cart-panel-open');
    if (isOpen) {
        cartPanel.classList.replace('cart-panel-open', 'cart-panel-closed');
        cartOverlay.classList.remove('cart-overlay-active');
    } else {
        cartPanel.classList.replace('cart-panel-closed', 'cart-panel-open');
        cartOverlay.classList.add('cart-overlay-active');
    }
};

/**
 * Muestra un mensaje temporal dentro del panel del carrito.
 * @param {string} message 
 * @param {string} type 'success' o 'error'
 */
const showCartMessage = (message, type = 'success') => {
    cartMessageBox.textContent = message;
    cartMessageBox.classList.remove('hidden');
    if (type === 'success') {
        cartMessageBox.className = 'p-4 bg-palees-yellow text-palees-blue font-semibold text-center';
    } else if (type === 'error') {
        cartMessageBox.className = 'p-4 bg-palees-red text-white font-semibold text-center';
    }

    setTimeout(() => {
        cartMessageBox.classList.add('hidden');
    }, 3000);
};

// --- MANEJO DEL CARRITO ---

/**
 * Agrega un producto al carrito o incrementa su cantidad.
 * @param {number} productId 
 */
window.addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return console.error('Producto no encontrado');

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            imgSrc: product.imgSrc,
            quantity: 1
        });
    }

    renderCart();
    showCartMessage(`${product.name} añadido!`, 'success');
};

/**
 * Cambia la cantidad de un producto.
 * @param {number} productId 
 * @param {number} change (+1 o -1)
 */
window.changeQuantity = (productId, change) => {
    const itemIndex = cart.findIndex(item => item.id === Number(productId));
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;

        if (cart[itemIndex].quantity <= 0) {
            // Eliminar si la cantidad llega a cero
            cart.splice(itemIndex, 1);
        }
        renderCart();
    }
};

//Simula la finalización de la compra.
window.checkout = () => {
    if (cart.length === 0) {
        showCartMessage('No hay productos para comprar.', 'error');
        return;
    }
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    showCartMessage(`¡Compra exitosa! Total pagado: ${formatCurrency(total)}`, 'success');
    cart = []; // Vaciar el carrito
    renderCart();
    // Mantener el carrito abierto por un momento para ver el mensaje
    setTimeout(toggleCart, 4000);
};


// --- RENDERIZADO DE PRODUCTOS ---

/**
//Genera las tarjetas de producto dinámicamente según la página.
 * @param {number} page
 */
const renderProducts = (page) => {
    const container = document.getElementById('products-container');
    const totalPages = getTotalPages();

    if (page < 1 || page > totalPages) {
        container.innerHTML = `<p class="col-span-full text-center text-xl text-palees-red p-8">Página no encontrada.</p>`;
        return;
    }

    // Calcular índices para el slice
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToDisplay = products.slice(startIndex, endIndex);

    container.innerHTML = productsToDisplay.map(product => `
    <div class="product-card">
        <img src="${product.imgSrc}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${formatCurrency(product.price)}</p>
        <button onclick="addToCart(${product.id})">Añadir al carrito</button>
    </div>
`).join('');

};

// --- FUNCIONES DE PAGINACIÓN ---

/**
 * Navega a una página específica.
 * @param {number} page 
 */
window.goToPage = (page) => {
    const totalPages = getTotalPages();
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderProducts(currentPage);
        renderPagination();
        // Desplazarse al inicio de la sección de productos
        document.getElementById('productos-ofertas').scrollIntoView({ behavior: 'smooth' });
    }
};

/** Navega a la página anterior. */
window.prevPage = () => {
    goToPage(currentPage - 1);
};

/** Navega a la página siguiente. */
window.nextPage = () => {
    goToPage(currentPage + 1);
};

/**
 * Renderiza los controles de paginación (botones Anterior, Siguiente y números).
 */
window.renderPagination = () => {
    const paginationContainer = document.getElementById('pagination-container');
    const totalPages = getTotalPages();

    if (totalPages <= 1) {
        paginationContainer.innerHTML = ''; // No mostrar si solo hay 1 página
        return;
    }

    let paginationHtml = '';

    // Botón Anterior
    paginationHtml += `
        <button 
            onclick="prevPage()" 
            class="px-3 py-1 rounded-lg font-semibold border border-palees-blue text-palees-blue hover:bg-palees-blue hover:text-white transition ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}" 
            ${currentPage === 1 ? 'disabled' : ''}>
            Anterior
        </button>
    `;

    // Números de Página
    for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage;
        paginationHtml += `
            <button 
                onclick="goToPage(${i})" 
                class="px-3 py-1 rounded-lg font-semibold border ${isActive ? 'bg-palees-blue text-white border-palees-blue' : 'border-palees-blue text-palees-blue hover:bg-palees-blue hover:text-white transition'}">
                ${i}
            </button>
        `;
    }

    // Botón Siguiente
    paginationHtml += `
        <button 
            onclick="nextPage()" 
            class="px-3 py-1 rounded-lg font-semibold border border-palees-blue text-palees-blue hover:bg-palees-blue hover:text-white transition ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}" 
            ${currentPage === totalPages ? 'disabled' : ''}>
            Siguiente
        </button>
    `;

    paginationContainer.innerHTML = `<nav class="flex justify-center space-x-2 mt-6">${paginationHtml}</nav>`;
};



// --- RENDERIZADO DE CARRITO (Sin cambios en lógica, solo para completar) ---

/**
 * Renderiza los elementos del carrito y actualiza el contador/total.
 */
window.renderCart = () => {
    const cartItemsContainer = document.getElementById('cart-items-list');
    const cartTotalElement = document.getElementById('cart-total');
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center text-palees-text-medium italic pt-4">El carrito está vacío.</p>';
        cartTotalElement.textContent = formatCurrency(0);
        cartCountEl.textContent = 0;
        return;
    }

    const cartHtml = cart.map(item => {
        const itemSubtotal = item.price * item.quantity;
        total += itemSubtotal;

        return `
            <div class="flex items-center justify-between py-3 border-b border-gray-200">
                <div class="flex items-center space-x-3">
                    <img src="${item.imgSrc}" alt="${item.name}" class="w-14 h-14 object-cover rounded-lg border">
                    <div>
                        <p class="font-semibold text-palees-blue text-sm">${item.name}</p>
                        <p class="text-xs text-palees-text-medium">${formatCurrency(item.price)} c/u</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="changeQuantity(${item.id}, -1)" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">−</button>
                    <span class="font-semibold">${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
                </div>
                <div class="font-semibold text-palees-blue text-sm">
                    ${formatCurrency(itemSubtotal)}
                </div>
            </div>
        `;
    }).join('');

    cartItemsContainer.innerHTML = cartHtml;
    cartTotalElement.textContent = formatCurrency(total);
    cartCountEl.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
};


// --- INICIALIZACIÓN ---
window.onload = () => {
    renderProducts(currentPage); // Muestra la primera página al inicio
    renderPagination();          // Renderiza la paginación
    renderCart();                // Inicializa el carrito
};
