document.addEventListener("DOMContentLoaded", () => {
  // Verificamos si hay usuario activo
  const usuarioActivo = localStorage.getItem("usuarioActivo");
  if (!usuarioActivo) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("user-display").textContent =
    `Hola, ${usuarioActivo}`;

  // Array para almacenar la lista de productos actual en session.
  let listaActual = JSON.parse(sessionStorage.getItem("listaActual")) || [];

  function updateCounter() {
    document.getElementById("items-count").textContent = listaActual.length;
  }
  updateCounter();

  const categoriesContainer = document.getElementById("categories-container");
  const productsContainer = document.getElementById("products-container");

  // Extraer tipos únicos de los datos
  const tipos = [...new Set(PRODUCTOS.map((p) => p.tipo))];

  // Generar botones de categoría
  tipos.forEach((tipo, index) => {
    const btn = document.createElement("button");
    // Clases comunes para los botones de categoría
    btn.classList.add(
      "category-btn",
      "btn",
      "btn-outline-primary",
      "rounded-pill",
      "fw-medium",
    );
    if (index === 0) {
      btn.classList.remove("btn-outline-primary");
      // Seleccionar la primera categoría por defecto
      btn.classList.add("btn-primary", "active");
    }
    btn.textContent = tipo;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".category-btn").forEach((b) => {
        b.classList.remove("active", "btn-primary");
        b.classList.add("btn-outline-primary");
      });
      btn.classList.remove("btn-outline-primary");
      btn.classList.add("btn-primary", "active");
      renderProducts(tipo);
    });
    categoriesContainer.appendChild(btn);
  });

  // Renderizar productos por tipo
  function renderProducts(tipo) {
    productsContainer.innerHTML = "";
    const filtrados = PRODUCTOS.filter((p) => p.tipo === tipo);

    filtrados.forEach((prod) => {
      const col = document.createElement("div");
      col.classList.add("col");

      const selectedItem = listaActual.find((item) => item[0] === prod.nombre);
      const isSelected = selectedItem
        ? "selected border-success bg-success-subtle"
        : "border-0";

      col.innerHTML = `
<div class="card h-100 product-card shadow-sm ${isSelected}">
  <img src="${prod.enlace}" alt="${prod.nombre}" class="card-img-top product-img">
  <div class="card-body text-center d-flex flex-column justify-content-center">
    <h6 class="card-title fw-bold mb-1">${prod.nombre}</h6>
    ${selectedItem ? `<p class="card-text text-success fw-bold small mb-0 mt-2">En lista: ${selectedItem[1]}</p>` : ""}
  </div>
</div>
`;

      // Gestionar click en la tarjeta para añadir/modificar cantidad
      const cardElement = col.querySelector(".product-card");
      cardElement.addEventListener("click", () => {
        let defaultQty = 1;
        const existing = listaActual.find((item) => item[0] === prod.nombre);
        if (existing) defaultQty = existing[1];

        const inputQty = prompt(`Cantidad para ${prod.nombre}:`, defaultQty);

        if (inputQty !== null) {
          // Si el usuario cancela el prompt, no hacemos nada
          let qty = parseInt(inputQty, 10);
          if (isNaN(qty) || qty < 0) {
            alert("Cantidad inválida");
            return;
          }

          if (qty === 0) {
            listaActual = listaActual.filter((item) => item[0] !== prod.nombre);
          } else if (existing) {
            existing[1] = qty;
          } else {
            listaActual.push([prod.nombre, qty]);
          }

          sessionStorage.setItem("listaActual", JSON.stringify(listaActual));
          updateCounter();
          renderProducts(tipo);
        }
      });

      productsContainer.appendChild(col);
    });
  }

  // Inicializar con la primera categoría
  if (tipos.length > 0) renderProducts(tipos[0]);

  // Botones de acción
  document.getElementById("btn-guardar").addEventListener("click", () => {
    if (listaActual.length === 0) {
      alert("No tienes productos en la lista");
      return;
    }
    const confirmacion = confirm("¿Deseas guardar esta lista?");
    if (confirmacion) {
      const fechas = new Date();
      const fechaVal = fechas.toISOString();

      const nuevaLista = new Lista(usuarioActivo, fechaVal, [...listaActual]);

      const historialListas =
        JSON.parse(localStorage.getItem("historialListas")) || [];
      historialListas.push({
        _usuario: nuevaLista.usuario,
        _fecha: nuevaLista.fecha,
        _productos: nuevaLista.productos,
      });
      localStorage.setItem("historialListas", JSON.stringify(historialListas));
      listaActual = [];
      sessionStorage.removeItem("listaActual");
      updateCounter();
      renderProducts(
        document.querySelector(".category-btn.active").textContent,
      );
      alert("Lista guardada exitosamente");
    }
  });

  document.getElementById("btn-mostrar").addEventListener("click", () => {
    if (listaActual.length === 0) {
      alert(
        "Debes añadir productos a la lista actual para poder visualizarla o puedes ir al Historial para ver listas guardadas.",
      );
      return;
    }
    window.location.href = "lista.html?current=true";
  });

  document.getElementById("btn-listas").addEventListener("click", () => {
    window.location.href = "historial.html";
  });

  document.getElementById("btn-logout").addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
    sessionStorage.removeItem("listaActual");
    window.location.href = "index.html";
  });
});
