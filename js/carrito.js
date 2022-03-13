 //esta funcion ira armando la lista (tabla) a medida que se vayan agregando productos al carrito, como tambien calculando el precio total del contenido agregado
function cargarProductosCarrito() {  
    const currency = function(number){
        return new Intl.NumberFormat('es-AR', {style: 'currency', currency: 'ARG', minimumFractionDigits: 2}).format(number);
    };
    let productos = cargarCarrito();

    if (productos.length == 0) {
        $("#productos_carrito").html("<h2 class='text-center'>No se encontraron productos en el Carrito!</h2>");
        return false;
    }

    let total_pagar = 0;
    let contenido = `<table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Producto</th>
        <th scope="col">Precio</th>
      </tr>
    </thead>
    <tbody>`;

    for (let producto of productos) {
        let precio = currency(producto.precio);
        contenido += `<tr>
        <td><img src='../images/${producto.imagen}' alt='${producto.nombre}' class="imagListado" width='80'></td>
        <td>${producto.nombre}</td> 
        <td>$${precio}</td>
        </tr>`;
        total_pagar += parseFloat(producto.precio);
    }

    let total_pagar_precio = currency(total_pagar);
    contenido += `<tr>
    <td>&nbsp;</td>
    <td align='right'>Total</td>
    <td><b>$${total_pagar_precio}</b></td>
    </tr>
    </tbody>
    </table>`;
    //document.getElementById("productos_carrito").innerHTML = contenido + "<div class='container col-md-12 '><div class= 'row justify-content-end'> <button class='btn btn-secondary col-md-5 '>Comprar</button> </div></div>";
    $("#productos_carrito").html(contenido+ "<div class='container col-md-12 '><div class= 'row justify-content-end'> <button class='btn btn-secondary col-md-5 '>Comprar</button> </div></div>");
  }
//=====================================================================================================================================


//defino evento al hacer click en eliminar 
$("#eliminar_carrito").click(function(){
            eliminarCarrito();
});



// Cargo los Productos de mi Carrito
cargarProductosCarrito();

