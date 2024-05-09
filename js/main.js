document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.closest('.col-md-4');
            const productId = productCard.getAttribute('data-product-id');
            const productName = productCard.querySelector('.card-title').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            addProductToCart(productId, productName, productPrice);
        });
    });

    function addProductToCart(productId, productName, productPrice) {
        const productIndex = cart.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            cart[productIndex].quantity += 1;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Producto añadido al carrito: ' + productName);
    }
});