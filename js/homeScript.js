var usuario = sessionStorage.getItem("usuario")
console.log(usuario)
var texto = document.createTextNode(usuario)
var padre = document.getElementById("userlogeado").parentNode;
padre.appendChild(texto)

showTime();

function showTime() {
    myDate = new Date();
    hours = myDate.getHours();
    minutes = myDate.getMinutes();
    seconds = myDate.getSeconds();
    if (hours < 10) hours = 0 + hours;

    if (minutes < 10) minutes = "0" + minutes;

    if (seconds < 10) seconds = "0" + seconds;

    $("#date").text(hours + ":" + minutes + ":" + seconds);
    setTimeout("showTime()", 1000);
}

document.querySelector('#btn__buscar').addEventListener('click', buscarPersonaje)

function buscarPersonaje() {
    var idBuscar = $("#id").val();
    if (validacion(idBuscar)) {
        getPersonaje(idBuscar);
        $("#id").val("");
        $("#id").focus();
    }
}

function validacion(id) {
    var expresionRegular = /^\d{1,2}$/;
    if (!expresionRegular.test(id)) {
        alert("el valor ingresado no puede tener mas de 2 digitos");
        $("#input_buscar").focus();
        return false;
    }
    if (id > 99) {
        alert("Id de personaje no encontrado (hardcode)");
    }
    return true;
}

function getPersonaje(id) {
    var datos = '';
    $.ajax({
        type: "GET",
        url: `https://rickandmortyapi.com/api/character/${id}`,
        success: function(responseAPI) {
            $("#resultado").append(mostrarTabla(responseAPI))
            sessionStorage.setItem('api', responseAPI.image)
        }
    });
    sessionStorage.setItem('id', id)
}

function mostrarTabla(personaje) {
    var tbody = `
    <tr>
    <td>${personaje.id}</td>
    <td onclick="mostrar(${personaje})">${personaje.name}</td>
    <td>${personaje.status}</td>
    <td>${personaje.species}</td>
    <td>${personaje.type}</td>
    <td>${personaje.gender}</td>
    </tr> `
    return tbody;
}

function mostrar(personaje) {
    console.log("aca estamos???")
    var imagen = `<img src="${personaje.image}"`
    console.log(imagen)
}