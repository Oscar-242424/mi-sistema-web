const sesion = JSON.parse(sessionStorage.getItem("sesionGame"));
if (!sesion) window.location.href = "../index.html";

const TITULOS = { todos: "Todo el catálogo", juegos: "Juegos", consolas: "Consolas", controles: "Controles" };

let productos = cargarProductos();
let carrito = [];

const $ = id => document.getElementById(id);

$("saludo").textContent = "Hola, " + sesion.nombre;
if (sesion.rol === "admin") $("cajaRegistro").hidden = false;

const menu = $("menuLateral"), fondo = $("fondo"), btnMenu = $("btnMenu");
function abrirMenu() { menu.classList.add("abierto"); fondo.hidden = false; btnMenu.setAttribute("aria-expanded", "true"); }
function cerrarMenu() { menu.classList.remove("abierto"); fondo.hidden = true; btnMenu.setAttribute("aria-expanded", "false"); }
btnMenu.addEventListener("click", abrirMenu);
$("btnCerrar").addEventListener("click", cerrarMenu);
fondo.addEventListener("click", cerrarMenu);
document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarMenu(); });

function mostrarProductos(filtro = "todos") {
  const lista = filtro === "todos" ? productos : productos.filter(p => p.categoria === filtro);
  $("tituloCategoria").textContent = TITULOS[filtro];
  $("contador").textContent = lista.length + " productos";
  $("productos").innerHTML = lista.map(p => `
    <article class="producto">
      <div class="producto__img">${p.imagen ? `<img src="${esc(p.imagen)}" alt="${esc(p.nombre)}">` : ICONOS[p.categoria]}</div>
      <div class="producto__info">
        <span class="producto__cat">${p.categoria}</span>
        <h3>${esc(p.nombre)}</h3>
        <span class="precio">Bs ${p.precio}</span>
        <button data-id="${p.id}">Agregar al carrito</button>
      </div>
    </article>`).join("") || "<p>No hay productos en esta categoría.</p>";
}

document.querySelectorAll(".nav a").forEach(enlace => {
  enlace.addEventListener("click", () => {
    document.querySelector(".nav a.activo").classList.remove("activo");
    enlace.classList.add("activo");
    mostrarProductos(enlace.dataset.filtro);
    cerrarMenu();
  });
});

$("productos").addEventListener("click", e => {
  const boton = e.target.closest("button[data-id]");
  if (!boton) return;
  const p = productos.find(x => x.id === Number(boton.dataset.id));
  const existente = carrito.find(i => i.id === p.id);
  if (existente) existente.cantidad++;
  else carrito.push({ id: p.id, nombre: p.nombre, precio: p.precio, cantidad: 1 });
  mostrarCarrito();
});

function mostrarCarrito() {
  if (!carrito.length) {
    $("listaCarrito").innerHTML = '<li class="vacio">Tu carrito está vacío.</li>';
    $("total").textContent = "Bs 0";
    return;
  }
  $("listaCarrito").innerHTML = carrito.map(i =>
    `<li><span>${i.cantidad} × ${esc(i.nombre)}</span><span>Bs ${i.cantidad * i.precio}</span></li>`).join("");
  $("total").textContent = "Bs " + carrito.reduce((s, i) => s + i.cantidad * i.precio, 0);
}

$("btnVaciar").addEventListener("click", () => { carrito = []; mostrarCarrito(); });

$("formProducto").addEventListener("submit", e => {
  e.preventDefault();
  const msg = $("msgProducto");
  const nombre = $("pNombre").value.trim();
  const precio = Number($("pPrecio").value);
  msg.classList.remove("error");

  if (!nombre || !(precio > 0)) {
    msg.classList.add("error");
    msg.textContent = "Escribe el nombre y un precio mayor a 0.";
    return;
  }
  productos.push({ id: Date.now(), nombre, categoria: $("pCategoria").value, precio, imagen: $("pImagen").value.trim() });
  try { localStorage.setItem("productosGame", JSON.stringify(productos)); } catch {}
  mostrarProductos(document.querySelector(".nav a.activo").dataset.filtro);
  e.target.reset();
  msg.textContent = "Producto registrado.";
});

$("btnSalir").addEventListener("click", () => {
  sessionStorage.removeItem("sesionGame");
  window.location.href = "../index.html";
});

const catInicial = new URLSearchParams(location.search).get("cat");
const filtroInicial = TITULOS[catInicial] ? catInicial : "todos";
document.querySelector(".nav a.activo").classList.remove("activo");
document.querySelector(`.nav a[data-filtro="${filtroInicial}"]`).classList.add("activo");
mostrarProductos(filtroInicial);
mostrarCarrito();
