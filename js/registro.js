import { Usuario } from "./clases.js";
import { POBLACIONES } from "./datos.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registro-form");
  const selectPoblacion = document.getElementById("poblacion");
  const inputCp = document.getElementById("codigoPostal");

  // Rellenar el select de poblaciones
  POBLACIONES.forEach((p) => {
    const option = document.createElement("option");
    option.value = p.poblacion;
    option.textContent = p.poblacion;
    selectPoblacion.appendChild(option);
  });

  // Gestionar el cambio en la selección de población -> Actualizar código postal
  selectPoblacion.addEventListener("change", (e) => {
    const selected = POBLACIONES.find((p) => p.poblacion === e.target.value);
    if (selected) {
      inputCp.value = selected.codigoPostal;
      clearError("poblacion");
      clearError("codigo");
    } else {
      inputCp.value = "";
    }
  });

  // Gestionar el cambio en el código postal -> Actualizar población
  inputCp.addEventListener("input", (e) => {
    const cp = e.target.value.trim();
    const selected = POBLACIONES.find((p) => p.codigoPostal === cp);
    if (selected) {
      selectPoblacion.value = selected.poblacion;
      clearError("poblacion");
      clearError("codigo");
    } else {
      selectPoblacion.value = ""; // No match
    }
  });

  function showError(fieldId, msg = "") {
    const group = document.getElementById(`group-${fieldId}`);
    group.classList.add("error");
    if (msg) {
      const errorSpan = group.querySelector(".error-message");
      if (fieldId === "pass-reg") {
        const passErr = document.getElementById("pass-error");
        if (passErr) {
          passErr.textContent = msg;
          passErr.style.display = "block";
        }
      } else if (
        (errorSpan && fieldId === "usuario-reg") ||
        fieldId === "codigo" ||
        fieldId === "poblacion"
      ) {
        errorSpan.textContent = msg;
      }
    }
  }

  function clearError(fieldId) {
    const group = document.getElementById(`group-${fieldId}`);
    group.classList.remove("error");
    if (fieldId === "pass-reg") {
      const passErr = document.getElementById("pass-error");
      if (passErr) passErr.style.display = "none";
    }
  }

  // Submit form
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Resetear errores
    [
      "nombre",
      "apellidos",
      "direccion",
      "codigo",
      "poblacion",
      "telefono",
      "correo",
      "usuario-reg",
      "pass-reg",
    ].forEach(clearError);

    let isValid = true;

    const nombre = document.getElementById("nombre").value.trim();
    if (!nombre) {
      showError("nombre");
      isValid = false;
    }

    const apellidos = document.getElementById("apellidos").value.trim();
    if (!apellidos) {
      showError("apellidos");
      isValid = false;
    }

    const direccion = document.getElementById("direccion").value.trim();
    if (!direccion) {
      showError("direccion");
      isValid = false;
    }

    const cp = inputCp.value.trim();
    const poblacion = selectPoblacion.value;
    if (
      !cp ||
      !poblacion ||
      !POBLACIONES.find(
        (p) => p.codigoPostal === cp && p.poblacion === poblacion,
      )
    ) {
      showError(
        "codigo",
        "Código postal y población no coinciden o no existen",
      );
      showError("poblacion", "Población inválida");
      isValid = false;
    }

    const telefono = document.getElementById("telefono").value.trim();
    const telRegex = /^[0-9]{9,15}$/; // Flexible simple tel regex
    if (!telRegex.test(telefono)) {
      showError("telefono");
      isValid = false;
    }

    const correo = document.getElementById("correo").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      showError("correo");
      isValid = false;
    }

    const usuarioVal = document.getElementById("usuario-reg").value.trim();
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (!usuarioVal) {
      showError("usuario-reg", "El usuario no puede estar vacío");
      isValid = false;
    } else if (usuarios.some((u) => u._usuario === usuarioVal)) {
      showError("usuario-reg", "Este usuario ya está registrado");
      isValid = false;
    }

    const pass = document.getElementById("contrasena-reg").value;
    // Validación de contraseña: al menos 8 caracteres, letras, números y al menos 2 caracteres especiales
    const hasLetters = /[a-zA-Z]/.test(pass);
    const hasNumbers = /[0-9]/.test(pass);
    // regex para contar caracteres especiales (no alfanuméricos)
    const specialCharsMatch = pass.match(/[^a-zA-Z0-9\s]/g);
    const hasTwoSpecials = specialCharsMatch && specialCharsMatch.length >= 2;

    if (pass.length < 8 || !hasLetters || !hasNumbers || !hasTwoSpecials) {
      showError("pass-reg", "La contraseña no cumple los requisitos");
      isValid = false;
    }

    if (isValid) {
      const nuevoUser = new Usuario(
        nombre,
        apellidos,
        direccion,
        poblacion,
        cp,
        telefono,
        correo,
        usuarioVal,
        pass,
      );
      usuarios.push(nuevoUser);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      alert("Usuario registrado con éxito.");
      window.location.href = "index.html";
    }
  });
});
