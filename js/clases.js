export class Usuario {
  constructor(
    nombre,
    apellidos,
    direccion,
    poblacion,
    codigoPostal,
    telefono,
    correo,
    usuario,
    contrasena,
  ) {
    this._nombre = nombre;
    this._apellidos = apellidos;
    this._direccion = direccion;
    this._poblacion = poblacion;
    this._codigoPostal = codigoPostal;
    this._telefono = telefono;
    this._correo = correo;
    this._usuario = usuario;
    this._contrasena = contrasena;
  }

  // Getters
  get apellidos() {
    return this._apellidos;
  }

  get codigoPostal() {
    return this._codigoPostal;
  }

  get contrasena() {
    return this._contrasena;
  }

  get correo() {
    return this._correo;
  }

  get direccion() {
    return this._direccion;
  }

  get nombre() {
    return this._nombre;
  }

  get poblacion() {
    return this._poblacion;
  }

  get telefono() {
    return this._telefono;
  }

  get usuario() {
    return this._usuario;
  }

  // Setters
  set apellidos(value) {
    this._apellidos = value;
  }

  set codigoPostal(value) {
    this._codigoPostal = value;
  }

  set contrasena(value) {
    this._contrasena = value;
  }

  set correo(value) {
    this._correo = value;
  }

  set direccion(value) {
    this._direccion = value;
  }

  set nombre(value) {
    this._nombre = value;
  }

  set poblacion(value) {
    this._poblacion = value;
  }

  set telefono(value) {
    this._telefono = value;
  }

  set usuario(value) {
    this._usuario = value;
  }
}

export class Producto {
  constructor(nombre, tipo, enlace) {
    this._nombre = nombre;
    this._tipo = tipo;
    this._enlace = enlace;
  }

  // Getters
  get nombre() {
    return this._nombre;
  }

  get tipo() {
    return this._tipo;
  }

  get enlace() {
    return this._enlace;
  }

  // Setters
  set enlace(value) {
    this._enlace = value;
  }

  set nombre(value) {
    this._nombre = value;
  }

  set tipo(value) {
    this._tipo = value;
  }
}

export class Lista {
  constructor(usuario, fecha, productos) {
    this._usuario = usuario;
    this._fecha = fecha;
    this._productos = productos || [];
  }

  // Getters
  get fecha() {
    return this._fecha;
  }

  get productos() {
    return this._productos;
  }

  get usuario() {
    return this._usuario;
  }

  // Setters
  set fecha(value) {
    this._fecha = value;
  }

  set productos(value) {
    this._productos = value;
  }

  set usuario(value) {
    this._usuario = value;
  }
}
