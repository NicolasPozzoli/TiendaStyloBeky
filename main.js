// Arreglo para almacenar productos del carrito
let productosCarrito = [];

// Selección de elementos
const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Cargar eventos
cargarEventListeners();

function cargarEventListeners() {
    // Agregar al carrito
    elementos1.addEventListener('click', comprarElemento);
    // Eliminar un producto del carrito
    carrito.addEventListener('click', eliminarElemento);
    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    // Finalizar compra
    document.getElementById('finalizar-compra').addEventListener('click', finalizarCompra);
}

function comprarElemento(e) {
    e.preventDefault();
    // Verificar si el clic es sobre un botón 'agregar-carrito'
    if (e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        mostrarMensaje('Producto añadido al carrito');
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    // Obtener los datos del producto
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    // Insertar el producto al carrito
    insertarCarrito(infoElemento);
}

// Función para insertar el producto en el carrito
function insertarCarrito(elemento) {
    // Verificar si el producto ya está en el carrito
    const productoExistente = productosCarrito.find(item => item.id === elemento.id);

    if (productoExistente) {
        productoExistente.cantidad++; // Si existe, aumentar la cantidad
    } else {
        // Si no está, agregarlo al carrito
        productosCarrito.push({...elemento, cantidad: 1});
    }

    // Actualizar la vista del carrito
    actualizarCarrito();
}

function actualizarCarrito() {
    // Limpiar el carrito antes de actualizarlo
    lista.innerHTML = '';
    
    productosCarrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width="100" />
            </td>
            <td>
                ${producto.titulo}
            </td>
            <td>
                ${producto.precio}
            </td>
            <td>
                Cantidad: ${producto.cantidad}
            </td>
            <td>
                <a href="#" class="borrar" data-id="${producto.id}">X</a>
            </td>
        `;
        lista.appendChild(row);
    });
}

// Función para eliminar un producto del carrito
function eliminarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        const idProducto = e.target.getAttribute('data-id');
        productosCarrito = productosCarrito.filter(producto => producto.id !== idProducto); // Eliminar el producto
        actualizarCarrito();
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    productosCarrito = []; // Limpiar el carrito
    actualizarCarrito();
    return false;
}

// Función para mostrar mensaje
function mostrarMensaje(mensaje = '') {
    const mensajeElemento = document.querySelector('.mensaje');
    mensajeElemento.textContent = mensaje;
    mensajeElemento.classList.add('mostrar');
    setTimeout(() => {
        mensajeElemento.classList.remove('mostrar');
    }, 3000); // El mensaje desaparecerá después de 3 segundos
}

// Función para finalizar compra y enviar mensaje a WhatsApp
function finalizarCompra() {
    let mensaje = "Hola, estoy interesado en los siguientes productos:\n";

    // Generar mensaje con los productos del carrito
    productosCarrito.forEach(producto => {
        mensaje += `${producto.titulo} (Cantidad: ${producto.cantidad}) - ${producto.precio}\n`;
    });

    // URL de WhatsApp con el mensaje predefinido
    const telefono = "541127634086"; // Reemplaza con tu número de WhatsApp
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    // Redirige a la URL de WhatsApp
    window.open(url, "_blank");
}