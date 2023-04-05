
const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const botonComprar = document.getElementById('comprar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

const cantidad = document.getElementById('cantidad')

const precioTotal = document.getElementById('precioTotal')

const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})




 botonComprar.addEventListener('click', () => {
     if (carrito.length === 0) {
         Swal.fire({
             icon: 'warning',
             title: 'Carrito Vacio!',
             text: 'El carrito está vacío. Agregue productos para realizar una compra.'
         })
     } else {
         Swal.fire({
             icon: 'success',
             title: 'Pedido exitoso!',
             text: (`Se ha realizado una compra por un total de $${precioTotal.innerText}`)
         })
         Swal.fire;
         carrito = []
         actualizarCarrito()
         localStorage.removeItem('carrito')
         
     }
 })




 stockProductos.forEach((producto) => {
     const div = document.createElement('div')
     div.classList.add('producto')
     div.innerHTML = `
     <figure> <img src=${producto.img} alt= ""> </figure>
     <div class="info-product">
     <h3 class="productoNombre">${producto.nombre}</h3>
     <p class="precioProducto">$${producto.precio}</p>
     <button id="agregar${producto.id}" class="boton-agregar">Agregar al carrito <i class="fas fa-shopping-cart"></i></button>
     </div>
     `
     contenedorProductos.appendChild(div)


     const boton = document.getElementById(`agregar${producto.id}`)


     boton.addEventListener('click', () => {

         agregarAlCarrito(producto.id)

         Toastify({
             
             type: 'success',
             text: 'Producto en carrito',
             duration: 2000,
             gravity: 'bottom',

         }).showToast();
     })
 })


 const agregarAlCarrito = (prodId) => {

     const existe = carrito.some (prod => prod.id === prodId)

     if (existe){
         const prod = carrito.map (prod => {
             if (prod.id === prodId){
                 prod.cantidad++
             }
         })
     } else {
         const item = stockProductos.find((prod) => prod.id === prodId)
         carrito.push(item)
     }

     actualizarCarrito()
 }

 const eliminarDelCarrito = (prodId) => {
     const item = carrito.find((prod) => prod.id === prodId)

     const indice = carrito.indexOf(item)

     carrito.splice(indice, 1)
     actualizarCarrito()
     console.log(carrito)
 }

 const actualizarCarrito = () => {

     contenedorCarrito.innerHTML = ""
     carrito.forEach((prod) => {
         const div = document.createElement('div')
         div.className = ('productoEnCarrito')
         div.innerHTML = `
         <p>${prod.nombre}</p>
         <p>Precio: $${prod.precio}</p>
         <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
         <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i>
         </button>
         `

         contenedorCarrito.appendChild(div)


         localStorage.setItem('carrito', JSON.stringify(carrito))


     })

     contadorCarrito.innerText = carrito.length
     console.log(carrito)
     precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
     

     
}
  
fetch('patrocinadores.json')
    .then(response => response.json())
    .then(data => {
        const patrocinadores = document.getElementById('patrocinadores');
    

        data.forEach(item => {
            const listItem = document.createElement('div');
            const image = document.createElement('img');
            image.src = item.image;
            image.classList.add('patrocinador-img')
            listItem.appendChild(image)
            patrocinadores.appendChild(listItem);
        });
    })

    .catch(error => console.error(error))


saveLocal();
