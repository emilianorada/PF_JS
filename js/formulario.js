//==============================================OBJETO CLIENTE=================================================================================
class Cliente {                                  
    constructor(datos_formulario) {
        this.nombre = datos_formulario.nombre;              //Defino los 6 atriubutos que tendrá 
        this.apellido = datos_formulario.apellido;
        this.email = datos_formulario.email;
        this.telefono = datos_formulario.telefono
        this.seleccionado = datos_formulario.seleccionado;
        this.comentario = datos_formulario.comentario;
    }
}//==============================================================================================================================================



//==============================================Funcion para validar el formulario==============================================================
function enviarDatos() {

    let nombre_cliente = $("#nombre").val();     //Guardo en una variable el valor que posee el elemento cuyo id=nombre
    let apellido_cliente = $("#apellido").val();         //  ""
    let email_cliente = $("#email").val(); 
    let telefono_cliente = $("#telefono").val();           //  ""
    let seleccion_cliente = $("#seleccionado").val();      //  ""    
    let comentario_cliente = $("#comentarios").val();      //  ""

    //CONDICIONES A CUMPLIR PARA CADA CAMPO:
    if ((nombre_cliente == "" ) || (nombre_cliente.length <= 2 )|| (nombre_cliente.length > 40)){
        mostrarError (true, "Ingrese un nombre  valido");
        $("#nombre").focus();
        return false;
    } else {
        mostrarError(false, "");
    } 
        
    if ((apellido_cliente == "" ) || (apellido_cliente.length <= 2 )|| (apellido_cliente.length > 40)){
        mostrarError (true, "Ingrese un apellido valido");
        $("#apellido").focus();
        return false;
    } else {
        mostrarError(false, "");
    }  

    if ((email_cliente == "" ) || (email_cliente.length <= 3 )|| (email_cliente.length > 40)){
        mostrarError (true, "Ingrese un email valido");
        $("#email").focus();
        return false;
    } else {
        mostrarError(false, "");
    }  
    
    if ((telefono_cliente == "" ) || (telefono_cliente.length <= 3 )|| (telefono_cliente.length > 40)){
        mostrarError (true, "Ingrese un telefono valido");
        $("#telefono").focus();
        return false;
    } else {
        mostrarError(false, "");
    }  

    if (seleccion_cliente == "Motivo de su consulta"){
        mostrarError (true, "Seleccione un tema relacionado a su consulta");
        return false;
    } else {
        mostrarError(false, "");
    }  
        
    guardarDatos(nombre_cliente, apellido_cliente,email_cliente,telefono_cliente, seleccion_cliente, comentario_cliente);
   // mostrarMensaje("Datos almacenados con éxito en localStorage");  
}//============================================================================================================================================



//=============================================================================================================================================
function mostrarError(estado, mensaje) {
    if (estado) {
        $("#resultado").html("<p class='p-3 mb-2 bg-danger text-white text-center'>" + mensaje + "</p>"); 
    } else {
        $("#resultado").html("");
    }
}//===========================================================================================================================================


//=============================================================================================================================================
//La siguiente funcion guarda los atributos vinculandolos en un objeto, y se guardan en localStorage, en formato JSON
function guardarDatos(nombre_cliente, apellido_cliente, email_cliente, telefono_cliente, seleccion_cliente, comentario_cliente) {
    let cliente = new Cliente({nombre:nombre_cliente, apellido:apellido_cliente, email:email_cliente, telefono:telefono_cliente, seleccionado:seleccion_cliente, comentario: comentario_cliente});
    localStorage.setItem("datos_formulario", JSON.stringify(cliente));
}//===========================================================================================================================================


//=============================================================================================================================================
function mostrarMensaje(mensaje) {
    //document.getElementById("resultado").innerHTML = "<p class='p-3 mb-2 bg-success text-white text-center'>" + mensaje + "</p>";
    $("#resultado").html("<p class='p-3 mb-2 bg-success text-white text-center'>" + mensaje + "</p>");
}//============================================================================================================================================



//============================================EVENTO ASOCIADO AL BOTON "ENVIAR DATOS"========================================================== 
$("#enviarDatos").click (() => {   
    enviarDatos();                 //funcion encargada de validar campos              
    $(document).ready(function() { //cuando este listo el documento/cuando este cargado va a ejecutar la funcion

    //Declaración de la url del API
    const APIURL = 'https://620d04d5b573632593a2cedf.mockapi.io/api/v1/datos' ; 

    //Declaración de la información a enviar
    const infoPost =  { nombre: $("#nombre").val(),  
                        apellido: $("#apellido").val(), 
                        email: $("#email").val(), 
                        telefono: $("#telefono").val(), 
                        seleccion:  $("#seleccionado").val(), 
                        comentario:  $("#comentarios").val()
                      };    
    $.ajax({
    method: "POST",
    url:  APIURL,
    data: infoPost,
    success: function(respuesta){
        if( `${respuesta.nombre}`!= "" && `${respuesta.apellido}`!="" && `${respuesta.email}` !="" && `${respuesta.telefono}`!= "" && `${respuesta.seleccion}` != "Motivo de su consulta"){
        $("#resultado").prepend(`<div><p class='p-3 mb-2 bg-success text-white text-center'> Datos enviados con exito!</p></div>`);
        }
    },

    error: function(respuesta){
        $("#estado").prepend(`<div><p class='p-3 mb-2 bg-danger text-white text-center'> Fallo el envío</p></div>`);
        }
    });
});
});



//===========================================================================================================================================
//Esta funcion obtendra datos_formulario, que fue guardado en localStorage. Gracias al metodo parse convertirá los datos que están en 
//formato JSON y Luego los vaciará y los pasará a guardarDatos, por parámetro, donde seran guardados .
function borrarLocal() {
    let cliente = JSON.parse(localStorage.getItem("datos_formulario"));
    cliente.nombre = "";
    cliente.apellido = "";
    cliente.email = "";
    cliente.telefono = "";
    cliente.seleccionado = "";
    cliente.comentario = "";
    guardarDatos(cliente.nombre, cliente.apellido, cliente.email, cliente.telefono, cliente.seleccionado, cliente.comentario);
    mostrarMensaje("Datos borrados");//Datos borrados de localStorage con exito
}//============================================================================================================================================

//Asigno el Evento "Click" al Botón "borrarLocalStorage" :
$("#resetear").click(() => {
                        borrarLocal();                              
                        }
                    );


 
    









