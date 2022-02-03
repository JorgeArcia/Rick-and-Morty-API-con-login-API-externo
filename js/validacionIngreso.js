$("#btn__ingresar").click("submit", data => {
    let email = $("#correo").val();
    if (email == "") {
        return false
    }
    let password = $("#password").val();
    if (password == "") {
        return false
    }
    var intentos = login(email, password)
})

function login(email, password) {
    var userCorrecto = false
    $.ajax({
        type: "GET",
        url: `https://jsonplaceholder.typicode.com/users/`,
        success: function(responseAPI) {
            for (let index = 0; index < (responseAPI.length); index++) {
                if (email == responseAPI[index].email && password == responseAPI[index].id) {
                    userCorrecto = true
                    sessionStorage.setItem('usuario', responseAPI[index].email)
                    window.location.href = "Home.html"
                    console.log("aca al menos")
                }
            }
            if (!userCorrecto) {
                alert("Usuario o contraseña incorrecto")
            }
        },
        error: function(response) {
            alert("No se puede acceder a la informacion del servidor")
        }
    });
    return userCorrecto
}