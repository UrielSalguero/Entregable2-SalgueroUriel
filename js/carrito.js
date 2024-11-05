let carrito = JSON.parse(localStorage.getItem("carritoproductos")) || []
const carritocontenedor = document.getElementById("carrito-contenedor")

function renderCarrito(cartItems) {
    carritocontenedor.innerHTML = ''
    if (cartItems.length === 0) {
        carritocontenedor.innerHTML = "<p>El carrito esta vacío</p>"
    } else {
        let total = 0
        cartItems.forEach(producto => {
            const subtotal = producto.precio * producto.cantidad
            total += subtotal

            const card = document.createElement("div")
            card.innerHTML = `<h3>${producto.nombre}</h3>
                              <p>Precio: $${producto.precio}</p>
                              <p>Cantidad: ${producto.cantidad}</p>
                              <p>Subtotal: $${subtotal}</p>
                              <button class="eliminar" data-id="${producto.id}">Eliminar</button>`
            carritocontenedor.appendChild(card)
        })
        const TotalCard = document.createElement("div")
        TotalCard.innerHTML = `<h3>Total: $${total}</h3>`
        carritocontenedor.appendChild(TotalCard)
    }
    addEliminarEvent()
}

function addEliminarEvent() {
    const eliminarBotones = document.querySelectorAll(".eliminar")
    eliminarBotones.forEach(button => {
        button.onclick = (e) => {
            const productId = parseInt(e.currentTarget.dataset.id)
            carrito = carrito.filter(item => item.id !== productId)
            localStorage.setItem("carritoproductos", JSON.stringify(carrito))
            renderCarrito(carrito)
        }
    })
}

renderCarrito(carrito)