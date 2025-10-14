document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent.trim();
            const productPriceElement = productCard.querySelector('.price-new') || productCard.querySelector('.price-old');
            const productPrice = parseFloat(productPriceElement.textContent.replace('S/', '').trim());
            const productImage = productCard.querySelector('img').src;
            const productId = productCard.dataset.id || Date.now();

            const productData = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage
            };

            console.log('🛍️ Producto añadido:', productData);

            // Llamamos al método del carrito expuesto en window
            if (window.cart && typeof window.cart.addToCart === 'function') {
                window.cart.addToCart(productData);
            } else {
                console.error('❌ El carrito no está disponible o no fue cargado antes de card.js');
            }

            // Efecto visual
            button.style.backgroundColor = '#FFD966';
            button.textContent = 'Añadido!';
            setTimeout(() => {
                button.style.backgroundColor = '';
                button.textContent = 'Añadir al carrito';
            }, 1500);
        });
    });
});
