# Práctica QA Manual: Registro de usuarios

## Requisitos
- Node.js instalado.
- Un navegador web.

## Cómo ejecutar
1. Abrir una terminal dentro de la carpeta `qa_manual_registro`.
2. Ejecutar `npm install`.
3. Ejecutar `npm start`.
4. Abrir `http://localhost:3000` en el navegador.

## Casos sugeridos para probar
1. Registrar con nombre, correo válido y contraseña de 8 o más caracteres.
2. Intentar registrar sin nombre.
3. Intentar registrar sin correo.
4. Intentar registrar con correo de formato incorrecto.
5. Intentar registrar con contraseña de menos de 8 caracteres.

## Nota para el/la docente
Hay un defecto intencional: la aplicación permite registrar un usuario con el correo electrónico vacío. El formulario y el servidor validan el formato cuando el correo tiene contenido, pero no exigen que el campo esté completo.

Los usuarios se guardan en memoria y desaparecen al reiniciar el servidor. Esta aplicación es solamente didáctica; no usar con datos reales ni contraseñas reales.
