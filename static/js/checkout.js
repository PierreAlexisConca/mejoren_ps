
document.addEventListener('DOMContentLoaded', () => {
    const CURRENCY_SYMBOL = window.cart.getCurrencySymbol();
    const TAX_RATE = window.cart.getTaxRate();
    const SHIPPING_COST = 15.00;

    const cartItems = window.cart.getItems();
    const subtotal = window.cart.getSubtotal();

    const summaryItemsContainer = document.getElementById('checkout-summary-items');
    const summarySubtotalElement = document.getElementById('summary-subtotal');
    const summaryTaxElement = document.getElementById('summary-tax');
    const summaryShippingElement = document.getElementById('summary-shipping');
    const summaryTotalElement = document.getElementById('summary-total');
    const checkoutForm = document.getElementById('checkout-form');

    if (cartItems.length === 0) {
        // --- CAMBIO AQUÍ ---
        summaryItemsContainer.innerHTML = '<p class="text-palees-text-medium">Tu carrito está vacío. <a href="/coleccion" class="text-palees-blue hover:underline">Ir a la tienda</a></p>';
        checkoutForm.querySelector('button[type="submit"]').disabled = true;
    } else {
        summaryItemsContainer.innerHTML = '';
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('flex', 'justify-between', 'items-center', 'mb-2');
            itemElement.innerHTML = `
                        <p class="text-palees-text-dark">${item.name} <span class="text-palees-text-light">x${item.quantity}</span></p>
                        <span class="font-semibold text-palees-blue">${CURRENCY_SYMBOL}${(item.price * item.quantity).toFixed(2)}</span>
                    `;
            summaryItemsContainer.appendChild(itemElement);
        });
    }

    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + (cartItems.length > 0 ? SHIPPING_COST : 0);

    summarySubtotalElement.textContent = CURRENCY_SYMBOL + subtotal.toFixed(2);
    summaryTaxElement.textContent = CURRENCY_SYMBOL + tax.toFixed(2);
    summaryShippingElement.textContent = CURRENCY_SYMBOL + (cartItems.length > 0 ? SHIPPING_COST.toFixed(2) : '0.00');
    summaryTotalElement.textContent = CURRENCY_SYMBOL + total.toFixed(2);

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (cartItems.length === 0) {
                alert('Tu carrito está vacío.');
                return;
            }

            const orderId = 'PALEES-' + Math.floor(Math.random() * 1000000);
            localStorage.setItem('lastOrderId', orderId);
            localStorage.setItem('lastOrderTotal', total.toFixed(2));
            window.cart.clearCart();

            // --- CAMBIO AQUÍ ---
            window.location.href = `/gracias?order=${orderId}`;
        });
    }
});