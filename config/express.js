/* 
    Archivo: config/express.js
    Descripción: Configuración central del servidor Express y del motor de vistas.
    Se configuran middlewares, el motor de vistas (EJS con ejs-mate) y la ruta a los archivos de vistas.
*/

const express = require('express');         // Importa el framework Express para crear la aplicación
const path = require('path');               // Módulo nativo de Node para manejar rutas de archivos y directorios
const engine = require('ejs-mate');         // Motor de plantillas que extiende EJS para permitir layouts y partials

module.exports = () => {
    // Crea una instancia de la aplicación Express
    const app = express();

    // Configura ejs-mate como motor de plantillas para archivos .ejs
    // Esto permite utilizar funcionalidades avanzadas como layouts y secciones
    app.engine('ejs', engine);
    app.set('view engine', 'ejs');

    // Define la ruta donde se encuentran las vistas (templates) de la aplicación
    app.set('views', path.join(__dirname, '../views'));

    // Middleware para parsear datos de formularios enviados en formato URL-encoded
    // Esto es útil para procesar datos enviados mediante métodos POST
    app.use(express.urlencoded({ extended: false }));

    // Aquí se pueden agregar otros middlewares, como el manejo de sesiones, CORS, etc.

    // Retorna la instancia configurada de Express para ser utilizada en app.js
    return app;
};