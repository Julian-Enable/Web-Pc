document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cart-items');
    let cart = JSON.parse(localStorage.getItem('carrito')) || [];

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-shopping-cart fa-4x text-muted mb-3"></i>
                    <h4 class="text-white">Tu carrito está vacío</h4>
                    <p class="text-muted">Agrega algunos productos para comenzar</p>
                    <a href="productos.html" class="btn-proceed" style="background: linear-gradient(135deg, #511573, #7b2cbf);">
                        <i class="fas fa-shopping-bag"></i>
                        <span>IR A PRODUCTOS</span>
                    </a>
                </div>
            `;
            updateCartSummary(0, 0, 0, 0);
            document.getElementById('checkout-btn').disabled = true;
            return;
        }

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.nombre}</div>
                    <div class="cart-item-price">${formatearPrecio(item.precio)}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="mx-2">${item.cantidad}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="cart-item-subtotal">
                    ${formatearPrecio(item.precio * item.cantidad)}
                </div>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        updateCartSummary();
        document.getElementById('checkout-btn').disabled = false;
    }

    function updateCartSummary() {
        const subtotal = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        const shipping = subtotal > 500000 ? 0 : 15000;
        const tax = subtotal * 0.19;
        const total = subtotal + shipping + tax;

        document.getElementById('cart-subtotal').textContent = formatearPrecio(subtotal);
        document.getElementById('cart-shipping').textContent = formatearPrecio(shipping);
        document.getElementById('cart-tax').textContent = formatearPrecio(tax);
        document.getElementById('cart-total').textContent = formatearPrecio(total);
    }

    function formatearPrecio(precio) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(precio);
    }

    function updateQuantity(productId, change) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            const newQuantity = item.cantidad + change;
            if (newQuantity <= 0) {
                removeFromCart(productId);
            } else if (newQuantity <= item.stock) {
                item.cantidad = newQuantity;
                localStorage.setItem('carrito', JSON.stringify(cart));
                updateCartDisplay();
            } else {
                mostrarNotificacion(`No hay más stock disponible. Máximo: ${item.stock} unidades`, 'warning');
            }
        }
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('carrito', JSON.stringify(cart));
        updateCartDisplay();
        mostrarNotificacion('Producto removido del carrito', 'info');
    }

    function mostrarNotificacion(mensaje, tipo = 'success') {
        const notificacion = document.createElement('div');
        notificacion.className = `alert alert-${tipo === 'error' ? 'danger' : tipo} alert-dismissible fade show`;
        notificacion.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border: none;
            border-radius: 8px;
        `;
        
        const iconos = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        notificacion.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="${iconos[tipo]} mr-2"></i>
                <span>${mensaje}</span>
            </div>
            <button type="button" class="close" data-dismiss="alert">
                <span>&times;</span>
            </button>
        `;

        document.body.appendChild(notificacion);

        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.remove();
            }
        }, 4000);
    }

    function procederAlPago() {
        if (cart.length === 0) {
            mostrarNotificacion('Tu carrito está vacío', 'warning');
            return;
        }
        window.location.href = 'pago.html';
    }

    // Hacer las funciones disponibles globalmente
    window.updateQuantity = updateQuantity;
    window.removeFromCart = removeFromCart;
    window.procederAlPago = procederAlPago;

    // Inicializar la vista del carrito
    updateCartDisplay();
});