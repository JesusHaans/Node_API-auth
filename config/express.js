/**
 * Archivo: config/express.js
 * Descripción: Configuración central del servidor Express, incluyendo el motor de vistas,
 *              middlewares para parseo de datos, manejo de sesiones y otras configuraciones.
 */

const express = require('express');         // Importa Express para crear la aplicación
const path = require('path');               // Módulo nativo para manejar rutas
const engine = require('ejs-mate');         // Motor de plantillas que extiende EJS para layouts y partials
const session = require('express-session'); // Middleware para manejo de sesiones

module.exports = () => {
    // Crea una instancia de la aplicación Express
    const app = express();

    // Configura ejs-mate como motor de plantillas para archivos .ejs
    app.engine('ejs', engine);
    app.set('view engine', 'ejs');

    // Define la ruta donde se encuentran las vistas (templates)
    app.set('views', path.join(__dirname, '../views'));

    // Middleware para parsear datos de formularios enviados en formato URL-encoded
    app.use(express.urlencoded({ extended: false }));

    // Configuración del middleware de sesiones para mantener un objeto req.session
    app.use(session({
        secret: process.env.SESSION_SECRET || 'defaultSecretKey',  // Usa una variable de entorno para mayor seguridad
        resave: false,                                              // No guarda la sesión si no se ha modificado
        saveUninitialized: false,                                   // No guarda sesiones vacías para evitar sobrecarga y ataques
        cookie: {
            httpOnly: true,                                          // Evita que la cookie sea accesible desde el cliente via JS
            secure: process.env.NODE_ENV === 'production',           // En producción, se exige HTTPS para enviar la cookie
            sameSite: 'lax'                                          // Puede ajustarse a 'strict' si se requiere mayor protección contra CSRF
        }
    }));

    // Aquí se pueden agregar otros middlewares (por ejemplo, CORS, logging, etc.)

    // Retorna la instancia configurada de Express
    return app;
};