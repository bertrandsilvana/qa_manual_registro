const form = document.querySelector("#formRegistro");
const campoNombre = document.querySelector("#nombre");
const campoEmail = document.querySelector("#email");
const campoPassword = document.querySelector("#password");
const mensaje = document.querySelector("#mensaje");
const listaUsuarios = document.querySelector("#listaUsuarios");
const btnActualizar = document.querySelector("#btnActualizar");

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = `mensaje ${tipo}`;
}

form.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const nombre = campoNombre.value.trim();
  const email = campoEmail.value.trim();
  const password = campoPassword.value;

  if (!nombre) {
    mostrarMensaje("Ingresá el nombre y apellido.", "error");
    return;
  }

  // DEFECTO INTENCIONAL PARA LA PRÁCTICA:
  // Se valida el formato del correo solamente si el campo tiene contenido.
  // Por eso, un correo vacío llega al servidor y se acepta.
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    mostrarMensaje("Ingresá un correo electrónico válido.", "error");
    return;
  }

  if (password.length < 8) {
    mostrarMensaje("La contraseña debe tener al menos 8 caracteres.", "error");
    return;
  }

  try {
    const respuesta = await fetch("/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre, email, password })
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      mostrarMensaje(datos.mensaje || "No se pudo registrar el usuario.", "error");
      return;
    }

    mostrarMensaje(datos.mensaje, "exito");
    form.reset();
    await cargarUsuarios();
  } catch (error) {
    mostrarMensaje("No se pudo conectar con el servidor.", "error");
  }
});

async function cargarUsuarios() {
  try {
    const respuesta = await fetch("/api/usuarios");
    const usuarios = await respuesta.json();

    listaUsuarios.replaceChildren();

    if (usuarios.length === 0) {
      const item = document.createElement("li");
      item.className = "vacio";
      item.textContent = "Todavía no hay usuarios registrados.";
      listaUsuarios.appendChild(item);
      return;
    }

    usuarios.forEach((usuario) => {
      const item = document.createElement("li");
      item.textContent = `${usuario.nombre} — Correo: ${usuario.email || "(vacío)"} — Registro: ${usuario.creado}`;
      listaUsuarios.appendChild(item);
    });
  } catch (error) {
    listaUsuarios.textContent = "No se pudo cargar la lista de usuarios.";
  }
}

btnActualizar.addEventListener("click", cargarUsuarios);

cargarUsuarios();
