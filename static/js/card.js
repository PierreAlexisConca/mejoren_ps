// card.js
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price-new')
                ? parseFloat(productCard.querySelector('.price-new').textContent.replace('S/', '').trim())
                : parseFloat(productCard.querySelector('.price-old').textContent.replace('S/', '').trim());
            const productImage = productCard.querySelector('img').src;
            const productId = productCard.dataset.id || crypto.randomUUID();

            const productData = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage
            };

            console.log('Producto añadido:', productData);

            // ✅ Aquí llamas a la función global del carrito
            addToCart(productData);
            updateCartDisplay(); // <- Muy importante para que se vea en vivo

            // 🔔 Efecto visual (opcional)
            button.style.backgroundColor = '#4CAF50'; // Verde
            button.textContent = 'Añadido!';
            setTimeout(() => {
                button.style.backgroundColor = 'var(--primary-color)';
                button.textContent = 'Añadir al carrito';
            }, 1500);
        });
    });
});
