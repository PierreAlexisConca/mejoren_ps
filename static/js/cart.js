document.addEventListener('DOMContentLoaded', () => {

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const checkoutButton = document.getElementById('checkout-button');

    const CURRENCY_SYMBOL = 'S/. ';
    const TAX_RATE = 0.18;

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const updateCartCount = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    };

    const calculateSubtotal = () => {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const renderCartItems = () => {
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="cart-modal-empty">Tu carrito está vacío.</p>';
            cartSubtotal.textContent = CURRENCY_SYMBOL + '0.00';
            if (checkoutButton) checkoutButton.disabled = true;
            return;
        }

        if (checkoutButton) checkoutButton.disabled = false;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
    
`;


            cartItemsContainer.appendChild(itemElement);
        });

        cartSubtotal.textContent = CURRENCY_SYMBOL + calculateSubtotal().toFixed(2);

        document.querySelectorAll('.decrease-quantity-btn').forEach(button => {
            button.addEventListener('click', (e) => updateQuantity(e.target.dataset.id, -1));
        });
        document.querySelectorAll('.increase-quantity-btn').forEach(button => {
            button.addEventListener('click', (e) => updateQuantity(e.target.dataset.id, 1));
        });
        document.querySelectorAll('.cart-item-remove-btn').forEach(button => {
            button.addEventListener('click', (e) => removeFromCart(e.target.dataset.id));
        });
    };

    const updateQuantity = (productId, change) => {
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(productId);
            } else {
                saveCart();
                updateCartCount();
                renderCartItems();
            }
        }
    };

    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        saveCart();
        updateCartCount();
        renderCartItems();
    };

    const removeFromCart = (productId) => {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartCount();
        renderCartItems();
    };

    const toggleCartModal = () => {
        cartModal.classList.toggle('open');
    };

    if (addToCartButtons) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const product = {
                    id: e.target.dataset.id,
                    name: e.target.dataset.name,
                    price: parseFloat(e.target.dataset.price),
                    image: e.target.dataset.image
                };
                addToCart(product);
            });
        });
    }

    if (cartButton) cartButton.addEventListener('click', toggleCartModal);
    if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCartModal);
    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) toggleCartModal();
        });
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (cart.length > 0) {
                saveCart();
                // --- CAMBIO IMPORTANTE AQUÍ ---
                window.location.href = '/checkout';
            } else {
                alert('Tu carrito está vacío.');
            }
        });
    }

    window.cart = {
        getItems: () => cart,
        getSubtotal: calculateSubtotal,
        getCurrencySymbol: () => CURRENCY_SYMBOL,
        getTaxRate: () => TAX_RATE,
        clearCart: () => { cart = []; saveCart(); updateCartCount(); renderCartItems(); }
    };

    updateCartCount();
    renderCartItems();
});

document.addEventListener('DOMContentLoaded', () => {
    const orderIdElement = document.getElementById('order-id-status');
    const orderId = localStorage.getItem('lastOrderId');
    if (orderId && orderIdElement) {
        orderIdElement.textContent = orderId;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const orderIdElement = document.getElementById('order-id');
    const orderTotalElement = document.getElementById('order-total');
    const CURRENCY_SYMBOL = window.cart.getCurrencySymbol();
    const orderId = localStorage.getItem('lastOrderId');
    const orderTotal = localStorage.getItem('lastOrderTotal');
    if (orderId && orderIdElement) orderIdElement.textContent = orderId;
    if (orderTotal && orderTotalElement) orderTotalElement.textContent = CURRENCY_SYMBOL + orderTotal;
});