// Array de objetos Producto
const PRODUCTOS = [
  // Frutas y vegetales
  new Producto("Manzana", "Frutas y vegetales", "img/manzana.avif"),
  new Producto("Plátano", "Frutas y vegetales", "img/platano.avif"),
  new Producto("Zanahoria", "Frutas y vegetales", "img/zanahoria.avif"),
  new Producto("Tomate", "Frutas y vegetales", "img/tomate.avif"),
  // Panes y pastas
  new Producto("Pan de molde", "Panes y pastas", "img/pan_de_molde.avif"),
  new Producto("Baguette", "Panes y pastas", "img/baguette.avif"),
  new Producto("Macarrones", "Panes y pastas", "img/macarrones.avif"),
  new Producto("Espaguetis", "Panes y pastas", "img/espaguetis.avif"),
  // Leche y quesos
  new Producto("Leche entera", "Leche y quesos", "img/leche_entera.avif"),
  new Producto("Queso Cheddar", "Leche y quesos", "img/queso_cheddar.avif"),
  new Producto("Yogur natural", "Leche y quesos", "img/yogur_natural.avif"),
  // Carne y pescado
  new Producto(
    "Pechuga de pollo",
    "Carne y pescado",
    "img/pechuga_de_pollo.avif",
  ),
  new Producto("Salmón", "Carne y pescado", "img/salmon.avif"),
  new Producto("Ternera", "Carne y pescado", "img/ternera.avif"),
  // Cereales y pastas
  new Producto(
    "Copos de avena",
    "Cereales y pastas",
    "img/copos_de_avena.avif",
  ),
  new Producto(
    "Cereales de chocolate",
    "Cereales y pastas",
    "img/cereales_de_chocolate.avif",
  ),
];

// Poblaciones y Códigos Postales mapping
const POBLACIONES = [
  { poblacion: "Madrid", codigoPostal: "28001" },
  { poblacion: "Barcelona", codigoPostal: "08001" },
  { poblacion: "Valencia", codigoPostal: "46001" },
  { poblacion: "Sevilla", codigoPostal: "41001" },
  { poblacion: "Zaragoza", codigoPostal: "50001" },
  { poblacion: "Málaga", codigoPostal: "29001" },
  { poblacion: "Murcia", codigoPostal: "30001" },
  { poblacion: "Palma de Mallorca", codigoPostal: "07001" },
  { poblacion: "Las Palmas de Gran Canaria", codigoPostal: "35001" },
  { poblacion: "Bilbao", codigoPostal: "48001" },
];
