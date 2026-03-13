document.addEventListener("DOMContentLoaded", () => {
  const usuarioActivo = localStorage.getItem("usuarioActivo");
  if (!usuarioActivo) {
    window.location.href = "index.html";
    return;
  }

  const tbody = document.getElementById("historial-body");
  const historialAll =
    JSON.parse(localStorage.getItem("historialListas")) || [];

  // Filtrar por el usuario activo y mapear el índice original
  const misListas = historialAll
    .map((lista, originalIndex) => ({ lista, originalIndex }))
    .filter((item) => item.lista._usuario === usuarioActivo);

  // Ordenar por fecha (descendente = más recientes primero)
  misListas.sort((a, b) => new Date(b.lista._fecha) - new Date(a.lista._fecha));

  if (misListas.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" style="text-align: center;">No tienes listas guardadas</td></tr>`;
    return;
  }

  misListas.forEach((item) => {
    const tr = document.createElement("tr");
    tr.classList.add("clickable-row");
    const dateObj = new Date(item.lista._fecha);
    tr.innerHTML = `
            <td>${dateObj.toLocaleString()}</td>
            <td>${item.lista._productos.length} items</td>
            <td><button class="btn btn-primary btn-sm px-3 fw-bold shadow-sm">Ver</button></td>
        `;
    tr.addEventListener("click", () => {
      window.location.href = `lista.html?index=${item.originalIndex}`;
    });
    tbody.appendChild(tr);
  });
});
