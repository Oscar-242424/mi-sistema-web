let clientes;
try { clientes = JSON.parse(localStorage.getItem("clientesGame")) || []; } catch { clientes = []; }

const $ = id => document.getElementById(id);
const msg = $("msgCliente");

function guardar() {
  try { localStorage.setItem("clientesGame", JSON.stringify(clientes)); } catch {}
}

function mostrarClientes() {
  $("contadorClientes").textContent = clientes.length + (clientes.length === 1 ? " cliente" : " clientes");
  $("tablaClientes").innerHTML = clientes.length
    ? clientes.map((c, i) => `
      <tr>
        <td>${esc(c.nombre)}</td><td>${esc(c.correo)}</td><td>${esc(c.telefono)}</td>
        <td>${esc(c.ciudad)}</td><td>${esc(c.plataforma)}</td>
        <td><button class="btn-linea" data-i="${i}" aria-label="Eliminar a ${esc(c.nombre)}">Eliminar</button></td>
      </tr>`).join("")
    : '<tr><td colspan="6" class="vacio">Aún no hay clientes registrados.</td></tr>';
}

function error(texto) { msg.className = "msg error"; msg.textContent = texto; }

$("formCliente").addEventListener("submit", e => {
  e.preventDefault();
  const nombre = $("cNombre").value.trim();
  const correo = $("cCorreo").value.trim().toLowerCase();
  const telefono = $("cTelefono").value.trim();
  const ciudad = $("cCiudad").value.trim();
  const plataforma = $("cPlataforma").value;

  if (!nombre || !correo || !telefono || !ciudad) return error("Completa todos los campos.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) return error("Escribe un correo válido, por ejemplo nombre@correo.com.");
  if (!/^\d{7,12}$/.test(telefono)) return error("El teléfono debe tener solo números (entre 7 y 12 dígitos).");
  if (clientes.some(c => c.correo === correo)) return error("Ese correo ya está registrado.");

  clientes.push({ nombre, correo, telefono, ciudad, plataforma });
  guardar();
  mostrarClientes();
  e.target.reset();
  msg.className = "msg";
  msg.textContent = "Cliente registrado.";
});

$("tablaClientes").addEventListener("click", e => {
  const b = e.target.closest("button[data-i]");
  if (!b) return;
  clientes.splice(Number(b.dataset.i), 1);
  guardar();
  mostrarClientes();
});

mostrarClientes();
