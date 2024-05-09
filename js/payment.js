document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe de manera predeterminada

    const cardNumber = document.getElementById('cardNumber').value;
    const cardName = document.getElementById('cardName').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    // Aquí se podrían agregar validaciones más complejas si fuera necesario

    // Simulación de "envío" de información de pago y actualización de estado del pedido
    console.log('Procesando pago para la tarjeta: ' + cardNumber);

    // Simulación de respuesta del servidor
    setTimeout(() => {
        // Aquí se actualizaría el estado del pedido en una base de datos real
        console.log('Pago procesado y pedido confirmado');

        // Redirigir a la página de confirmación
        window.location.href = 'confirmacion.html';
    }, 2000); // Simulamos un retraso de 2 segundos antes de la redirección para efectos demostrativos
});