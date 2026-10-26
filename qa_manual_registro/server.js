const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Para esta práctica no usamos base de datos.
// Los usuarios se guardan temporalmente en memoria.
const usuarios = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/usuarios", (req, res) => {
  const { nombre, email, password } = req.body;

  // Validaciones básicas del servidor.
  if (!nombre || !nombre.trim()) {
    return res.status(400).json({
      mensaje: "El nombre es obligatorio."
    });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({
      mensaje: "La contraseña debe tener al menos 8 caracteres."
    });
  }

  // DEFECTO INTENCIONAL PARA LA PRÁCTICA:
  // El servidor no rechaza el email vacío.
  // Esto permite que los estudiantes lo descubran con QA Manual.
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      mensaje: "Ingresá un correo electrónico válido."
    });
  }

  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre: nombre.trim(),
    email: email || "",
    // No guardamos la contraseña en la lista de ejemplo.
    creado: new Date().toLocaleString("es-AR")
  };

  usuarios.push(nuevoUsuario);

  return res.status(201).json({
    mensaje: "Usuario registrado correctamente.",
    usuario: nuevoUsuario
  });
});

// Permite consultar los registros creados durante esta ejecución.
app.get("/api/usuarios", (req, res) => {
  res.json(usuarios);
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
