/**
 * routes/index.js
 *
 * Archivo principal de rutas que integra las rutas de inicio y las de autenticación.
 */

const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const usersRoutes = require('./users');
const dashboardRoutes = require('./dashboard');

/**
 * Ruta para la página de inicio.
 */
router.get('/', homeController.index);

/**
 * Rutas relacionadas con la autenticación de usuarios.
 */
router.use('/users', usersRoutes);

/**
 * Rutas relacionadas con el dashboard de usuarios.
 */
router.use('/dashboard', dashboardRoutes);

module.exports = router;