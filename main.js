const productos = [
    { id: 1, nombre: "Cafe Espresso", precio: 950, descripcion: "Café intenso y aromático, preparado con granos de calidad. Ideal para un impulso rápido.", imagen: "./img/cafeespresso.png" },
    { id: 2, nombre: "Cafe con leche", precio: 1050, descripcion: "Un clásico irresistible, mezcla de café premium y leche espumada.", imagen: "./img/cafeleche.png" },
    { id: 3, nombre: "Cappuccino", precio: 1100, descripcion: "Un delicioso cappuccino elaborado con un espresso de alta calidad, leche vaporizada y una generosa capa de espuma de leche. Aromatizado con un toque de canela o chocolate en polvo.", imagen: "./img/capu.png" },
    { id: 4, nombre: "Latte de Caramelo Cremoso", precio: 1250, descripcion: "Doble shot de espresso con leche cremosa. Perfecta armonía para el gusto exigente.", imagen: "./img/latte.png" },
    { id: 5, nombre: "Flat White Premium", precio: 1250, descripcion: "Café suave con un toque dulce de caramelo y leche espumosa que acaricia el paladar.", imagen: "./img/white.png" },
    { id: 6, nombre: "Mocha de Chocolate Amargo", precio: 1350, descripcion: "Café y cacao oscuro se unen en una bebida indulgente y sofisticada.", imagen: "./img/moca.png" },
    { id: 7, nombre: "Affogato de Vainilla", precio: 1375, descripcion: "Helado de vainilla sumergido en espresso caliente, un postre y café en uno.", imagen: "./img/afogato.png" },
    { id: 8, nombre: "Cold Brew Exótico", precio: 1280, descripcion: "Café frío, infusionado lentamente para un sabor refrescante y único.", imagen: "./img/cold.png" }
];

let carritoproductos = JSON.parse(localStorage.getItem("carritoproductos")) || []
const contenedorproductos = document.getElementById("contenedor-productos")


const busqueda = document.createElement("input")
busqueda.type = "text"
busqueda.id = "busqueda"
busqueda.placeholder = "BUSCAR PRODUCTO"
document.body.insertBefore(busqueda, contenedorproductos)

const buscarProducto = document.createElement("button")
buscarProducto.id = "buscar-producto"
buscarProducto.textContent = "Buscar Producto"
document.body.insertBefore(buscarProducto, contenedorproductos)


function renderProductos(p) {
    contenedorproductos.innerHTML = ''
    if (p.length === 0) {
        contenedorproductos.innerHTML = "<p>No se encontró su producto. Algunas sugerencias:</p>"
        productos.forEach(producto => {
            const card = document.createElement("div")
            card.innerHTML = `<h3>${producto.nombre}</h3>
                              <img src="${producto.imagen}" alt="${producto.nombre}" />
                              <p>$${producto.precio}</p>
                              <input type="number" min="1" value="1" class="cantidad" id="cantidad-${producto.id}">
                              <button class="productoAgregar" id="${producto.id}">Agregar</button>`
            contenedorproductos.appendChild(card)
        });
    } else {
        p.forEach(producto => {
            const card = document.createElement("div");
            card.innerHTML = `<h3>${producto.nombre}</h3>
                              <img src="${producto.imagen}" alt="${producto.nombre}" />
                              <p>$${producto.precio}</p>
                              <input type="number" min="1" value="1" class="cantidad" id="cantidad-${producto.id}">
                              <button class="productoAgregar" id="${producto.id}">Agregar</button>`
            contenedorproductos.appendChild(card);
        });
        addToCartButton()
    }
}


function buscarProduct() {
    const busc = busqueda.value.toLowerCase(); 
    const filtroproducto = productos.filter(producto => producto.nombre.toLowerCase().includes(busc))
    renderProductos(filtroproducto)
}

buscarProducto.addEventListener("click", buscarProduct)


function addToCartButton() {
    const addboton = document.querySelectorAll(".productoAgregar")
    addboton.forEach(button => {
        button.onclick = (e) => {
            const productId = parseInt(e.currentTarget.id);
            const cantidadInput = document.getElementById(`cantidad-${productId}`)
            const cantidad = parseInt(cantidadInput.value);
            const selectedproduct = productos.find(producto => producto.id === productId)
            const productoencarrito = carritoproductos.find(item => item.id === productId)
            if (productoencarrito) {
                productoencarrito.cantidad += cantidad
            } else {
                selectedproduct.cantidad = cantidad
                carritoproductos.push(selectedproduct)
            }
            localStorage.setItem("carritoproductos", JSON.stringify(carritoproductos))
        }
    })
}
renderProductos(productos)
