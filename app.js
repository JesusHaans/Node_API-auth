/* 
    Archivo: app.js
    Descripción: Archivo principal de la aplicación.
    Se configura dotenv para cargar las variables de entorno definidas en el archivo .env.
*/

require('dotenv').config();  // Carga y configura las variables de entorno desde el archivo .env

const app = require('./config/express')();  // Importa y ejecuta la configuración de Express
const routes = require('./routes');         // Importa las rutas definidas en la carpeta 'routes'

// Usa las rutas definidas a partir de la raíz ('/')
app.use('/', routes);

// Define el puerto utilizando la variable de entorno PORT, o por defecto 3000 si no está definido
const PORT = process.env.PORT || 3000;

// Inicia el servidor y escucha en el puerto especificado, mostrando un mensaje en consola al arrancar
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});