
        let cart = [];
        function loadCart() {
            const saved = localStorage.getItem('cart');
            cart = saved ? JSON.parse(saved) : [];
        }

        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        function updateCartDisplay() {
            console.log('🟡 Carrito al actualizar:', cart);
            const container = document.getElementById('cart-items-container');
            const cartCountEl = document.getElementById('cart-count');
            const cartCountModalEl = document.getElementById('cart-count-modal');
            const subtotalEl = document.getElementById('cart-subtotal');

            let totalItems = 0;
            let subtotal = 0;

            cart.forEach(item => {
                totalItems += item.quantity;
                subtotal += item.price * item.quantity;
            });

            cartCountEl.textContent = totalItems;
            cartCountModalEl.textContent = totalItems;
            subtotalEl.textContent = `S/ ${subtotal.toFixed(2)}`;

            if (cart.length === 0) {
                emptyMessageEl.classList.remove('hidden');
                container.innerHTML = '';
                return;
            } else {
                emptyMessageEl.classList.add('hidden');
            }

            container.innerHTML = '';
            cart.forEach(item => {
                container.innerHTML += `

        `;
            });

            // Eventos de botones
            container.querySelectorAll('.decrease-btn').forEach(btn => {
                btn.addEventListener('click', e => {
                    changeQuantity(e.currentTarget.dataset.id, -1);
                });
            });
            container.querySelectorAll('.increase-btn').forEach(btn => {
                btn.addEventListener('click', e => {
                    changeQuantity(e.currentTarget.dataset.id, 1);
                });
            });
            container.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', e => {
                    removeItem(e.currentTarget.dataset.id);
                });
            });
        }

        function addToCart(productData) {
            productData.id = String(productData.id);
            const existing = cart.find(i => i.id === productData.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({ ...productData, quantity: 1 });
            }
            saveCart();
            updateCartDisplay();
            toggleCartModal(true);
            console.log('Carrito después de añadir:', cart); // <-- log agregado
        }

        function changeQuantity(id, delta) {
            const item = cart.find(i => i.id === id);
            if (item) {
                item.quantity += delta;
                if (item.quantity <= 0) {
                    removeItem(id);
                } else {
                    saveCart();
                    updateCartDisplay();
                    console.log('Cantidad cambiada:', item); // <-- log agregado
                }
            }
        }

        function removeItem(id) {
            cart = cart.filter(i => i.id !== id);
            saveCart();
            updateCartDisplay();
            console.log('Item eliminado, carrito actual:', cart); // <-- log agregado
        }

        function toggleCartModal(forceOpen = false) {
            const modal = document.getElementById('cart-modal');
            const overlay = document.getElementById('cart-modal-overlay');
            const shouldOpen = forceOpen || !modal.classList.contains('active');
            if (shouldOpen) {
                modal.classList.add('active');
                overlay.classList.add('active');
                overlay.classList.remove('opacity-0');
            } else {
                modal.classList.remove('active');
                overlay.classList.remove('active');
                overlay.classList.add('opacity-0');
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            loadCart();
            updateCartDisplay();

            document.getElementById('filter-toggle').addEventListener('click', () => {
                document.getElementById('sidebar').classList.toggle('active');
                document.getElementById('sidebar-overlay').classList.toggle('hidden');
            });

            document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
                btn.addEventListener('click', e => {
                    const productData = {
                        id: e.currentTarget.dataset.id,
                        name: e.currentTarget.dataset.name,
                        price: Number(e.currentTarget.dataset.price),
                        image: e.currentTarget.dataset.image
                    };
                    console.log('Producto añadido:', productData);
                    addToCart(productData);
                });
            });

            document.getElementById('cart-modal').addEventListener('click', e => e.stopPropagation());
        });
