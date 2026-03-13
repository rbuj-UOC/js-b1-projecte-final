document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const usuarioInput = document.getElementById("usuario");
  const passInput = document.getElementById("contrasena");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = usuarioInput.value.trim();
    const password = passInput.value.trim();
    if (!username || !password) {
      alert("Por favor, rellena todos los campos");
      return;
    }
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const userFound = usuarios.find(
      (u) => u._usuario === username && u._contrasena === password,
    );
    if (userFound) {
      // Establecer usuario activo en localStorage para mantener sesión
      localStorage.setItem("usuarioActivo", userFound._usuario);
      window.location.href = "productos.html";
    } else {
      // Mostrar mensaje de error genérico para no revelar si el usuario o la contraseña son incorrectos
      alert("Usuario o contraseña incorrectos");
    }
  });
});
