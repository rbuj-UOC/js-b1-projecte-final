document.addEventListener("DOMContentLoaded", () => {
  const usuarioActivo = localStorage.getItem("usuarioActivo");
  if (!usuarioActivo) {
    window.location.href = "index.html";
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const isCurrent = params.get("current");
  const index = params.get("index");

  let productos;
  let fecha;

  if (isCurrent) {
    productos = JSON.parse(sessionStorage.getItem("listaActual")) || [];
    const now = new Date();
    fecha = `Lista actual sin guardar - ${now.toLocaleDateString()}`;
    document.getElementById("lista-title").textContent =
      "Tu Lista Actual (Borrador)";
  } else if (index !== null) {
    const historial = JSON.parse(localStorage.getItem("historialListas")) || [];
    const lista = historial[parseInt(index, 10)];
    if (lista && lista._usuario === usuarioActivo) {
      productos = lista._productos;
      const d = new Date(lista._fecha);
      fecha = `Fecha guardada: ${d.toLocaleString()}`;
    } else {
      alert("Lista no encontrada o no pertenece al usuario.");
      window.location.href = "historial.html";
      return;
    }
  } else {
    window.location.href = "productos.html";
    return;
  }

  document.getElementById("lista-date").textContent = fecha;

  const tbody = document.getElementById("lista-body");
  if (productos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="2" style="text-align: center;">No hay productos en esta lista</td></tr>`;
    return;
  }

  productos.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${item[0]}</td>
            <td class="text-end pe-4">${item[1]}</td>
        `;
    tbody.appendChild(tr);
  });
});
