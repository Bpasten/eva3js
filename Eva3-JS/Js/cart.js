// Array para almacenar los productos en el carrito
let carrito = [];

// Función para actualizar el carrito
function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    carritoItems.innerHTML = '';

    let total = 0;
    carrito.forEach(item => {
        const row = document.createElement('tr');

        const productoCell = document.createElement('td');
        productoCell.textContent = item.producto;
        row.appendChild(productoCell);

        const precioCell = document.createElement('td');
        precioCell.textContent = `$${item.precio.toFixed(2)}`;
        row.appendChild(precioCell);

        const cantidadCell = document.createElement('td');
        cantidadCell.textContent = item.cantidad;
        row.appendChild(cantidadCell);

        const totalCell = document.createElement('td');
        const totalItem = item.precio * item.cantidad;
        totalCell.textContent = `$${totalItem.toFixed(2)}`;
        row.appendChild(totalCell);

        total += totalItem;
        carritoItems.appendChild(row);
    });

    document.getElementById('total').textContent = total.toFixed(2);
}

// Función para agregar productos al carrito (esto debería llamarse desde eva3.html)
function agregarProducto(producto, precio) {
    const productoExistente = carrito.find(item => item.producto === producto);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ producto, precio, cantidad: 1 });
    }
    actualizarCarrito();
}

// Inicializa el carrito si hay productos almacenados en localStorage
document.addEventListener('DOMContentLoaded', () => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carritoGuardado;
    actualizarCarrito();
});

// Guardar el carrito en localStorage cada vez que se actualiza
window.addEventListener('beforeunload', () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
});

