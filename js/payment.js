document.addEventListener('DOMContentLoaded', function() {
    // Cargar el resumen del carrito
    loadOrderSummary();
    
    // Validación de tarjeta de crédito
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
            e.target.value = formattedValue;
        });
    }
    
    // Validación de CVV
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/gi, '');
            e.target.value = value;
        });
    }
    
    // Validación de nombre del titular
    const cardholderInput = document.getElementById('cardholderName');
    if (cardholderInput) {
        cardholderInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^a-zA-Z\s]/gi, '');
            e.target.value = value;
        });
    }
});

function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    const orderItemsContainer = document.getElementById('order-items');
    
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = `
            <div class="text-center py-3">
                <p class="text-muted">No hay productos en el carrito</p>
                <a href="productos.html" class="btn-proceed" style="background: linear-gradient(135deg, #511573, #7b2cbf);">
                    <i class="fas fa-shopping-bag"></i>
                    <span>IR A PRODUCTOS</span>
                </a>
            </div>
        `;
        updateOrderSummary(0, 0, 0, 0);
        return;
    }
    
    // Mostrar items del carrito
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
                Cantidad: ${item.cantidad}
            </div>
            <div class="cart-item-subtotal">
                ${formatearPrecio(item.precio * item.cantidad)}
            </div>
        `;
        orderItemsContainer.appendChild(itemElement);
    });
    
    // Calcular totales
    const subtotal = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const shipping = subtotal > 500000 ? 0 : 15000;
    const tax = subtotal * 0.19;
    const total = subtotal + shipping + tax;
    
    updateOrderSummary(subtotal, shipping, tax, total);
}

function updateOrderSummary(subtotal, shipping, tax, total) {
    document.getElementById('subtotal').textContent = formatearPrecio(subtotal);
    document.getElementById('shipping').textContent = formatearPrecio(shipping);
    document.getElementById('tax').textContent = formatearPrecio(tax);
    document.getElementById('total').textContent = formatearPrecio(total);
}

function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(precio);
}

function procesarPago() {
    // Validar formulario
    const cardNumber = document.getElementById('cardNumber').value;
    const cardholderName = document.getElementById('cardholderName').value;
    const expiryMonth = document.getElementById('expiryMonth').value;
    const expiryYear = document.getElementById('expiryYear').value;
    const cvv = document.getElementById('cvv').value;
    
    // Validaciones básicas
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
        mostrarNotificacion('Número de tarjeta inválido', 'error');
        return;
    }
    
    if (!cardholderName || cardholderName.length < 3) {
        mostrarNotificacion('Nombre del titular inválido', 'error');
        return;
    }
    
    if (!expiryMonth || !expiryYear) {
        mostrarNotificacion('Fecha de vencimiento inválida', 'error');
        return;
    }
    
    if (!cvv || cvv.length < 3) {
        mostrarNotificacion('CVV inválido', 'error');
        return;
    }
    
    // Verificar que hay productos en el carrito
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    if (cart.length === 0) {
        mostrarNotificacion('No hay productos en el carrito', 'error');
        return;
    }
    
    // Simular procesamiento de pago
    mostrarNotificacion('Procesando pago...', 'info');
    
    // Deshabilitar botón durante el procesamiento
    const payButton = document.querySelector('.btn-proceed');
    const originalText = payButton.innerHTML;
    payButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> PROCESANDO...';
    payButton.disabled = true;
    
    // Simular delay de procesamiento
    setTimeout(() => {
        // Limpiar carrito
        localStorage.removeItem('carrito');
        
        // Mostrar éxito
        mostrarNotificacion('¡Pago procesado exitosamente!', 'success');
        
        // Redirigir a confirmación
        setTimeout(() => {
            window.location.href = 'confirmacion.html';
        }, 2000);
        
    }, 3000);
}

function mostrarNotificacion(mensaje, tipo = 'success') {
    // Remover notificaciones existentes
    const notificacionesExistentes = document.querySelectorAll('.notificacion-pago');
    notificacionesExistentes.forEach(notif => notif.remove());
    
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion-pago alert alert-${tipo === 'error' ? 'danger' : tipo} alert-dismissible fade show`;
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

    // Remover después de 4 segundos
    setTimeout(() => {
        if (notificacion.parentNode) {
            notificacion.remove();
        }
    }, 4000);
}