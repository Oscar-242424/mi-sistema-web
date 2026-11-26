const sesion = JSON.parse(sessionStorage.getItem("sesionGame"));
if (!sesion) {
  window.location.href = "../index.html";
} else {
  document.getElementById("saludo").textContent = "Hola, " + sesion.nombre;
  document.getElementById("btnSalir").addEventListener("click", () => {
    sessionStorage.removeItem("sesionGame");
    window.location.href = "../index.html";
  });
}
