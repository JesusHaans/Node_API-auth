/* 
    Archivo: routes/index.js
    Descripción: Define las rutas principales de la aplicación.
    Cada ruta se vincula a su controlador correspondiente que maneja la lógica de la petición.
*/

const express = require('express');                                 // Importa Express para crear un router modular
const router = express.Router();                                    // Crea una instancia del router
const homeController = require('../controllers/homeController');    // Importa el controlador para la ruta de inicio

// Define la ruta raíz ('/') y asigna el controlador que responderá a las solicitudes GET
router.get('/', homeController.index);

// Se pueden agregar otras rutas y sus controladores en este mismo archivo o en otros archivos de rutas

// Exporta el router para integrarlo en el archivo principal (app.js)
module.exports = router;