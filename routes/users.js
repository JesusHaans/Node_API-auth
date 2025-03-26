/**
 * routes/auth.js
 *
 * Define las rutas relacionadas con la autenticación de usuarios (login, registro, etc.).
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * Ruta GET para mostrar el formulario de inicio de sesión.
 */
router.get('/login', authController.showLogin);

/**
 * Ruta POST para procesar el formulario de inicio de sesión.
 */
router.post('/login', authController.processLogin);

module.exports = router;