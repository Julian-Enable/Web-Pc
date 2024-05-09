document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const priceNumber = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
            const subtotal = priceNumber * item.quantity;
            total += subtotal;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${priceNumber.toFixed(2)}</td>
                <td><input type="number" value="${item.quantity}" min="1" class="form-control quantity" data-index="${index}"></td>
                <td class="subtotal">$${subtotal.toFixed(2)}</td>
                <td><button class="btn btn-danger remove-item" data-index="${index}">Eliminar</button></td>
            `;
            cartItemsContainer.appendChild(row);
        });
        const totalRow = document.createElement('tr');
        totalRow.innerHTML = `<td colspan="3" class="text-right"><strong>Total:</strong></td><td>$${total.toFixed(2)}</td><td></td>`;
        cartItemsContainer.appendChild(totalRow);
    }

    updateCartDisplay();

    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item')) {
            const indexToRemove = event.target.dataset.index;
            removeItemFromCart(indexToRemove);
        }
    });

    cartItemsContainer.addEventListener('change', function(event) {
        if (event.target.classList.contains('quantity')) {
            const index = event.target.dataset.index;
            const newQuantity = parseInt(event.target.value);
            if (newQuantity >= 1) {
                cart[index].quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay(); // Recalcula y actualiza el display del carrito
            } else {
                alert('La cantidad no puede ser menor que 1.');
                updateCartDisplay();
            }
        }
    });

    function removeItemFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay(); // Actualiza el display después de eliminar un item
    }
});

document.getElementById('proceed-to-checkout').addEventListener('click', function() {
    // Asegúrate de que el carrito no está vacío antes de proceder
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
        window.location.href = 'pago.html'; // Cambia esto por la URL de tu página de pago
    } else {
        alert('Tu carrito está vacío.');
    }
});