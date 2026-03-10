const botonLogin = document.querySelector(".ps-button");

botonLogin.addEventListener("click", function () {
    const usuario = document.getElementById("userid").value.trim();
    const contrasena = document.getElementById("pwd").value.trim();

    fetch("../usuario.JSON")
        .then(respuesta => respuesta.json())
        .then(usuarios => {
            const existe = usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);

            if (existe) {
                alert("Bienvenido " + existe.usuario);
                localStorage.setItem("usuarioActivo", JSON.stringify(existe));
                window.location.href = "menuView.html";
            } else {
                alert("Usuario o contraseña incorrectos");
            }
        })
        .catch(() => {
            alert("Error al cargar usuarios");
        });
});