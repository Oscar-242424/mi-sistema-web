const base = [
  { id: 1, nombre: "Control inalámbrico Pro",  categoria: "controles", precio: 125, imagen: "../img/sony-gamer-chroma-pearl-control-inalambrico-dualsense-ps5-chroma-711719587583-46367634194672.jpg"},
  { id: 2, nombre: "Control retro USB",        categoria: "controles", precio: 60, imagen: "../img/1795638364166.jpg" },
  { id: 3, nombre: "Consola Retro 500 juegos", categoria: "consolas",  precio: 480, imagen: "../img/IMG_87c19f81-74d5-46e7-9779-40cb73c325de.jpg" },
  { id: 4, nombre: "Consola portátil X",       categoria: "teclado gamer",  precio: 650, imagen: "../img/PR-02323-b.jpg" },
  { id: 5, nombre: "Aventura Galáctica",       categoria: "juegos",    precio: 90, imagen: "../img/IMG_94e821d9-651e-4f50-8beb-3380c11f7f6b.jpg" },
  { id: 6, nombre: "Carreras Turbo",           categoria: "juegos",    precio: 75, imagen: "../img/IMG_282e3e69-177d-4fee-8263-2a94dc992401.jpg" },
  { id: 7, nombre: "Fútbol Pro 2026",          categoria: "juegos",    precio: 150, imagen: "../img/IMG_56241a84-48d0-44d2-a9b2-2eb370133409.jpg" },
  { id: 8, nombre: "Mundo de Bloques",         categoria: "juegos",    precio: 110, imagen: "../img/1901-gran-turismo-7-ps4.jpg" }
];
const ICONOS = { juegos: "🎮", consolas: "🖥️", controles: "🕹️" };
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
function cargarProductos() {
  try { return JSON.parse(localStorage.getItem("productosGame")) || base; } catch { return base; }
}
