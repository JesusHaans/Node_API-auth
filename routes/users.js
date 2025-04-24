/**
 * routes/auth.js
 *
 * Define las rutas relacionadas con la autenticación de usuarios (login, registro, etc.).
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// rutas que se encargan de mostrar el formulario de inicio de sesión y procesar el inicio de sesión
/**
 * Ruta GET para mostrar el formulario de inicio de sesión.
 */
router.get('/login', authController.showLogin);

/**
 * Ruta POST para procesar el formulario de inicio de sesión.
 */
router.post('/login', authController.processLogin);

// rutas que se encargan de mostrar el formulario de registro y procesar el registro
/**
 * Ruta GET para mostrar el formulario de registro.
 */
router.get('/register', authController.showRegister);

/**
 * Ruta POST para procesar el formulario de registro.
 */
router.post('/register', authController.processRegister);

module.exports = router;