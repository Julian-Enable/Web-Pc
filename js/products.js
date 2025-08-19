// 📦 PRODUCTOS BIZ COMPUTERS - Sistema de Gestión de Productos
// Este archivo contiene todos los productos de la tienda para reutilización

const PRODUCTOS = [
    {
        id: 1,
        nombre: "Diadema Gamer HyperX Cloud Stinger 2 Core DTS",
        descripcion: "Cascos gamer de alta calidad",
        precio: 450000,
        imagen: "assets/Diadema-Gamer-HyperX-Cloud-Stinger-2-Core-DTS.jpg",
        categoria: "audio",
        stock: 15,
        especificaciones: {
            marca: "HyperX",
            modelo: "Cloud Stinger 2 Core DTS",
            tipo: "Over-ear",
            conectividad: "3.5mm",
            microfono: "Sí, removible",
            peso: "275g"
        }
    },
    {
        id: 2,
        nombre: "MICROFONO HYPERX QUADCAST S RGB",
        descripcion: "Microfono gamer de alta calidad",
        precio: 850000,
        imagen: "assets/MICROFONO HYPERX QUADCAST S RGB.jpg",
        categoria: "audio",
        stock: 8,
        especificaciones: {
            marca: "HyperX",
            modelo: "Quadcast S RGB",
            tipo: "USB Condenser",
            patron: "Cardioide",
            frecuencia: "20Hz-20kHz",
            rgb: "Sí, personalizable"
        }
    },
    {
        id: 3,
        nombre: "Mouse Gamer Logitech G502 X",
        descripcion: "Mouse gamer de alta calidad",
        precio: 380000,
        imagen: "assets/Mouse Gamer Logitech G502 X.jpg",
        categoria: "perifericos",
        stock: 22,
        especificaciones: {
            marca: "Logitech",
            modelo: "G502 X",
            sensor: "HERO 25K",
            dpi: "Hasta 25,600",
            botones: "11 programables",
            peso: "102g",
            rgb: "Sí"
        }
    },
    {
        id: 4,
        nombre: "Tarjeta INNO3D GEFORCE RTX 4080 SUPER X3 16G",
        descripcion: "Tarjeta grafica gamer",
        precio: 8500000,
        imagen: "assets/Tarjeta INNO3D GEFORCE RTX 4080 SUPER ICHILL X3 16G RGB.jpg",
        categoria: "componentes",
        stock: 3,
        especificaciones: {
            marca: "INNO3D",
            modelo: "RTX 4080 SUPER",
            memoria: "16GB GDDR6X",
            bus: "PCIe 4.0 x16",
            consumo: "320W",
            refrigeracion: "Triple fan",
            rgb: "Sí"
        }
    },
    {
        id: 5,
        nombre: "Tarjeta SPEEDSTER 210 AMD Radeon RX 7600 XT",
        descripcion: "Tarjeta grafica gamer",
        precio: 2200000,
        imagen: "assets/Tarjeta-XFX-SPEEDSTER-SWFT-210-AMD-Radeon-RX-7600-XT.jpg",
        categoria: "componentes",
        stock: 7,
        especificaciones: {
            marca: "XFX",
            modelo: "RX 7600 XT",
            memoria: "8GB GDDR6",
            bus: "PCIe 4.0 x8",
            consumo: "190W",
            refrigeracion: "Dual fan",
            rgb: "No"
        }
    },
    {
        id: 6,
        nombre: "Teclado Logitech G PRO LIGHTSPEED Black-5",
        descripcion: "Teclado gamer de alta calidad",
        precio: 650000,
        imagen: "assets/Teclado Logitech G PRO X TKL LIGHTSPEED Black-5.jpg",
        categoria: "perifericos",
        stock: 12,
        especificaciones: {
            marca: "Logitech",
            modelo: "G PRO X TKL",
            switches: "GX Blue/Red/Brown",
            layout: "TKL (87 teclas)",
            conectividad: "Wireless + USB-C",
            rgb: "Sí, LIGHTSYNC",
            peso: "810g"
        }
    }
];

// 🔧 FUNCIONES DE UTILIDAD PARA PRODUCTOS

/**
 * Formatea el precio en formato colombiano
 * @param {number} precio - Precio en números
 * @returns {string} Precio formateado
 */
function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(precio);
}

/**
 * Renderiza un producto en el DOM
 * @param {Object} producto - Objeto del producto
 * @param {string} containerId - ID del contenedor donde renderizar
 */
function renderizarProducto(producto, containerId = 'productos-container') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Contenedor con ID "${containerId}" no encontrado`);
        return;
    }

    const productoHTML = `
        <div class="col-md-4 mb-4" data-product-id="${producto.id}">
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" loading="lazy">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="price">${formatearPrecio(producto.precio)}</span>
                        <button class="add-to-cart-hover" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML += productoHTML;
}

/**
 * Renderiza todos los productos
 * @param {string} containerId - ID del contenedor
 * @param {string} categoria - Categoría específica (opcional)
 */
function renderizarTodosLosProductos(containerId = 'productos-container', categoria = null) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Contenedor con ID "${containerId}" no encontrado`);
        return;
    }

    container.innerHTML = ''; // Limpiar contenedor

    const productosFiltrados = categoria 
        ? PRODUCTOS.filter(p => p.categoria === categoria)
        : PRODUCTOS;

    productosFiltrados.forEach(producto => {
        renderizarProducto(producto, containerId);
    });
}

/**
 * Obtiene un producto por ID
 * @param {number} id - ID del producto
 * @returns {Object|null} Producto encontrado o null
 */
function obtenerProductoPorId(id) {
    return PRODUCTOS.find(producto => producto.id === id) || null;
}

/**
 * Busca productos por nombre
 * @param {string} termino - Término de búsqueda
 * @returns {Array} Array de productos que coinciden
 */
function buscarProductos(termino) {
    const terminoLower = termino.toLowerCase();
    return PRODUCTOS.filter(producto => 
        producto.nombre.toLowerCase().includes(terminoLower) ||
        producto.descripcion.toLowerCase().includes(terminoLower) ||
        producto.categoria.toLowerCase().includes(terminoLower)
    );
}

/**
 * Obtiene productos por categoría
 * @param {string} categoria - Categoría a filtrar
 * @returns {Array} Array de productos de la categoría
 */
function obtenerProductosPorCategoria(categoria) {
    return PRODUCTOS.filter(producto => producto.categoria === categoria);
}

/**
 * Obtiene todas las categorías disponibles
 * @returns {Array} Array de categorías únicas
 */
function obtenerCategorias() {
    return [...new Set(PRODUCTOS.map(producto => producto.categoria))];
}

// 🛒 FUNCIONES DEL CARRITO (Básicas)

/**
 * Agrega un producto al carrito
 * @param {number} productoId - ID del producto
 */
function agregarAlCarrito(productoId) {
    const producto = obtenerProductoPorId(productoId);
    if (!producto) {
        console.error('Producto no encontrado');
        mostrarNotificacion('Producto no encontrado', 'error');
        return;
    }

    // Verificar stock
    if (producto.stock <= 0) {
        mostrarNotificacion('Producto agotado', 'error');
        return;
    }

    // Obtener carrito del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = carrito.find(item => item.id === productoId);
    
    if (productoEnCarrito) {
        // Verificar si hay suficiente stock
        if (productoEnCarrito.cantidad >= producto.stock) {
            mostrarNotificacion(`No hay más stock disponible. Máximo: ${producto.stock} unidades`, 'warning');
            return;
        }
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1,
            stock: producto.stock
        });
    }

    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Mostrar notificación
    mostrarNotificacion(`${producto.nombre} agregado al carrito`, 'success');
    
    // Actualizar contador del carrito en el header
    actualizarContadorCarrito();
    
    // Efecto visual en el botón
    const boton = event.target;
    if (boton) {
        boton.innerHTML = '<i class="fas fa-check"></i> Agregado';
        boton.classList.add('btn-success');
        boton.classList.remove('btn-primary');
        
        setTimeout(() => {
            boton.innerHTML = '<i class="fas fa-cart-plus"></i> Agregar al Carrito';
            boton.classList.remove('btn-success');
            boton.classList.add('btn-primary');
        }, 2000);
    }
}

/**
 * Actualiza el contador del carrito en el header
 */
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    
    // Buscar o crear el contador del carrito
    let cartCounter = document.querySelector('.cart-counter');
    if (!cartCounter) {
        const cartIcon = document.querySelector('a[href="cart.html"]');
        if (cartIcon) {
            cartCounter = document.createElement('span');
            cartCounter.className = 'cart-counter';
            cartCounter.style.cssText = `
                position: absolute;
                top: -8px;
                right: -8px;
                background: #dc3545;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            `;
            cartIcon.style.position = 'relative';
            cartIcon.appendChild(cartCounter);
        }
    }
    
    if (cartCounter) {
        cartCounter.textContent = totalItems;
        cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

/**
 * Muestra una notificación mejorada
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - Tipo de notificación (success, error, warning, info)
 */
function mostrarNotificacion(mensaje, tipo = 'success') {
    // Remover notificaciones existentes
    const notificacionesExistentes = document.querySelectorAll('.notificacion-producto');
    notificacionesExistentes.forEach(notif => notif.remove());
    
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion-producto alert alert-${tipo === 'error' ? 'danger' : tipo} alert-dismissible fade show`;
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

/**
 * Ver detalles de un producto
 * @param {number} productoId - ID del producto
 */
function verProducto(productoId) {
    const producto = obtenerProductoPorId(productoId);
    if (!producto) {
        console.error('Producto no encontrado');
        return;
    }

    // Aquí puedes implementar la lógica para mostrar detalles
    // Por ejemplo, abrir un modal o navegar a una página de detalles
    console.log('Ver producto:', producto);
    
    // Por ahora, mostraremos los detalles en un alert
    const detalles = `
${producto.nombre}

Precio: ${formatearPrecio(producto.precio)}
Stock: ${producto.stock} unidades
Categoría: ${producto.categoria}

Especificaciones:
${Object.entries(producto.especificaciones)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')}
    `;
    
    alert(detalles);
}

// 📋 INICIALIZACIÓN AUTOMÁTICA
document.addEventListener('DOMContentLoaded', function() {
    // Si existe un contenedor de productos, renderizar automáticamente
    if (document.getElementById('productos-container')) {
        renderizarTodosLosProductos();
    }
    
    // Actualizar contador del carrito al cargar la página
    actualizarContadorCarrito();
    
    // Agregar estilos CSS para la notificación
    const estilos = document.createElement('style');
    estilos.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .cart-counter {
            animation: bounce 0.6s ease;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            60% {
                transform: translateY(-5px);
            }
        }
    `;
    document.head.appendChild(estilos);
});

// 🌐 EXPORTAR PARA USO EN OTROS ARCHIVOS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PRODUCTOS,
        formatearPrecio,
        renderizarProducto,
        renderizarTodosLosProductos,
        obtenerProductoPorId,
        buscarProductos,
        obtenerProductosPorCategoria,
        obtenerCategorias,
        agregarAlCarrito,
        verProducto
    };
}
