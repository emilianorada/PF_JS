 //Creo objeto que contenga todos los items de la tienda==============================================================================
 const productos = [{id:1, nombre:"Cargador Portatil", imagen:"tienda/tienda1.jpg", descripcion:["PGadnic Power Bank", "Carga Rapida 25000 Mah”"], precio:2595},
 {id:2, nombre:"PC Completa", imagen:"tienda/tienda2.jpg", descripcion:["Intel I5 9na 16gb Ddr4 Hd 1tb Gtx", "1650 4gb Gamer"], precio:2809},
 {id:3, nombre:"V-sol Onu V2802", imagen:"tienda/tienda3.jpg", descripcion:["V-sol Onu Gpon Wireless Router", "Dual Wi-fi"], precio:3028},
 {id:4, nombre:"Google Chromecast", imagen:"tienda/tienda4.jpg", descripcion:["Google Chromecast 3rd", "Generation Full HD carbón"], precio:3046},
 {id:5, nombre:"Estabilizador", imagen:"tienda/tienda5.jpg", descripcion:["Estabilizador de tensión", "SurElectric Future ER1000"], precio:3046},
 {id:6, nombre:"Parlante Bluetooth", imagen:"tienda/tienda6.jpg", descripcion:["Parlante Bluetooth Portatil Mini", "Hongo Usb 3w"], precio:3046},
 {id:7, nombre:"Parlante Karaoke", imagen:"tienda/tienda7.jpg", descripcion:["Parlante Karaoke Bluetooth", "3000wts Luces + Micrófono"], precio:4677},
 {id:8, nombre:"Mouse Genius", imagen:"tienda/tienda8.jpg", descripcion:["Mouse Genius Dx-110 Usb 1000", "Dpi Optico Negro"], precio:4685},
 {id:9, nombre:"Cargador Samsung", imagen:"tienda/tienda9.jpg", descripcion:["Cargador Samsung Original", "Micro Usb Carga Rapida J7 S7"], precio:4685}];
 //====================================================================================================================================



//primero se guardan los productos en localStorage, en formato string, por medio de stringify=================================================
function guardarProductosLocal(productos) {   
    localStorage.setItem("productos", JSON.stringify(productos));
}//===================================================================================================================================

guardarProductosLocal(productos);   //LLAMADO A FUNCION


 //obtiene los productos guardados en localStorage, en forma de objeto, gracias al metodo parse=======================================
function cargarProductosLocal() {        
    return JSON.parse(localStorage.getItem('productos'));
}//===================================================================================================================================




//esta funcion irá armando las cards con cada item perteneciente a "productos"  ======================================================         
function mostrarProductos() {

    let productos = cargarProductosLocal();

    for (let producto of productos) {
        let columna = document.createElement("div");
        columna.className = "col-md-6 col-sm-12 col-xl-6 col-lg-4 col-xxl-4 px-5 pt-3 pb-5";
        let encabezado = document.createElement("h4");
        encabezado.className = "p-3 mb-2 text-white text-uppercase text-center encab";
        encabezado.innerHTML = producto.nombre;
        let card = document.createElement("div");
        card.className = "card tarjeta";
        let imagen = document.createElement("img");
        imagen.className = "card-img-top";
        imagen.src = "../images/" + producto.imagen;
        imagen.alt = producto.nombre;
        let card_body = document.createElement("div");
        card_body.className = "card-body";
        let encabezado2 = document.createElement("h3");
        encabezado2.className = "card-title text-primary text-center";
        encabezado2.innerHTML = "$" + producto.precio;
        let card_text = document.createElement("p");
        card_text.className = "card-text";
        let lista = document.createElement("ul");
        lista.className = "list-group list-group-flush";

        for (let descrip of producto.descripcion) {
            let item_lista = document.createElement("li");
            item_lista.className = "list-group-item";
            item_lista.innerHTML = descrip;
            lista.appendChild(item_lista);
        }

        let boton = document.createElement("button");
        boton.className = "btn btn-secondary";
        boton.innerHTML = "(+) Agregar al carrito";
        boton.onclick = () => {
            confirmacionAgregarCarrito = confirm("Agregar al carrito?");
            if(confirmacionAgregarCarrito){
            agregarAlCarrito(producto.id);
            }
        }
        card_text.appendChild(lista);
        card_body.appendChild(encabezado2);
        card_body.appendChild(card_text);
        card_body.appendChild(boton);
        card.appendChild(imagen);
        card.appendChild(card_body);
        columna.appendChild(encabezado);
        columna.appendChild(card);
        $("#productos").append(columna);
    }
}//===============================================================================================================================



//================================================================================================================================
function agregarAlCarrito(id) {     

    let producto = buscarProducto(id);
    let productos = cargarCarrito();
    productos.push(producto);
    localStorage.setItem("carrito", JSON.stringify(productos));
    localStorage.setItem("total_carrito", productos.length);
    ActualizarTotalCarrito();
}//=================================================================================================================================



//==================================================================================================================================
function buscarProducto(id) {
    let productos = cargarProductosLocal();
    return productos.find(x => x.id == id);
}//================================================================================================================================



//==================================================================================================================================
function cargarCarrito() {
    if (localStorage.getItem("carrito")) {
        return JSON.parse(localStorage.getItem("carrito"));
    }
    return [];
}//=================================================================================================================================



//==================================================================================================================================
function totalCarrito() {
    if (localStorage.getItem("total_carrito")) {
        return localStorage.getItem("total_carrito");
    }
    return 0;
}//=================================================================================================================================




//==================================================================================================================================
function ActualizarTotalCarrito() {
    let total = totalCarrito();
    $("#datos_carrito").html(`<a href='carrito.html' title='Ver Carrito' class='text-white text-decoration-none'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg> ${total} Producto(s)</a>`);
}//=================================================================================================================================



//===================================================================================================================================
function eliminarCarrito() {
    confirmacionBorrarCarrito = confirm("Desea eliminar el carrito?");
    if(confirmacionBorrarCarrito){
    localStorage.removeItem("carrito");
    localStorage.removeItem("total_carrito");
    ActualizarTotalCarrito();
    }
    else return 0;
}//==================================================================================================================================


// Carga los productos
mostrarProductos();

// Leo el total de Productos en mi Carrito
ActualizarTotalCarrito();


    