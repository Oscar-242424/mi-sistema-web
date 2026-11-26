const destacados = cargarProductos().slice(0, 4);
document.getElementById("destacados").innerHTML = destacados.map(p => `
  <article class="producto">
    <div class="producto__img">${p.imagen ? `<img src="${esc(p.imagen)}" alt="${esc(p.nombre)}">` : ICONOS[p.categoria]}</div>
    <div class="producto__info">
      <span class="producto__cat">${p.categoria}</span>
      <h3>${esc(p.nombre)}</h3>
      <span class="precio">Bs ${p.precio}</span>
      <a class="btn" href="catalogo.html?cat=${p.categoria}">Ver en catálogo</a>
    </div>
  </article>`).join("");
