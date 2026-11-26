const usuarios = [
  { usuario: "oscar",   correo: "oscar@gmail.com",   clave: "oscar123", nombre: "Administrador", rol: "admin" },
  { usuario: "cliente", correo: "cliente@gamil.com", clave: "123",     nombre: "Cliente Gamer", rol: "cliente" }
];

const form = document.getElementById("formLogin");
const inputUsuario = document.getElementById("usuario");
const inputClave = document.getElementById("clave");
const mensaje = document.getElementById("mensaje");
const botonVer = document.getElementById("verClave");

if (sessionStorage.getItem("sesionGame")) {
  window.location.href = "pages/catalogo.html";
}

botonVer.addEventListener("click", () => {
  const oculto = inputClave.type === "password";
  inputClave.type = oculto ? "text" : "password";
  botonVer.textContent = oculto ? "Ocultar" : "Ver";
  botonVer.setAttribute("aria-label", oculto ? "Ocultar contraseña" : "Mostrar contraseña");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  mensaje.classList.remove("ok");

  const dato = inputUsuario.value.trim().toLowerCase();
  const clave = inputClave.value;

  if (!dato || !clave) {
    mensaje.textContent = "Escribe tu usuario o correo y tu contraseña.";
    return;
  }

  const encontrado = usuarios.find(u => (u.usuario === dato || u.correo === dato) && u.clave === clave);

  if (!encontrado) {
    mensaje.textContent = "Usuario o contraseña incorrectos. Revisa los datos e inténtalo de nuevo.";
    inputClave.value = "";
    inputClave.focus();
    return;
  }

  sessionStorage.setItem("sesionGame", JSON.stringify({ nombre: encontrado.nombre, rol: encontrado.rol }));
  mensaje.classList.add("ok");
  mensaje.textContent = "Ingreso correcto. Entrando a la tienda…";
  setTimeout(() => { window.location.href = "pages/catalogo.html"; }, 600);
});
