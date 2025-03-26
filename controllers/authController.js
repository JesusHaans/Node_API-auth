/**
 * controllers/authController.js
 *
 * Controlador para manejar la autenticación.
 */

const authService = require('../services/authService');

/**
 * Muestra el formulario de inicio de sesión.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
exports.showLogin = (req, res) => {
    res.render('pages/login', { title: 'Iniciar Sesión' });
};

/**
 * Procesa el inicio de sesión del usuario.
 *
 * Extrae el email y la contraseña del cuerpo de la solicitud, llama al servicio
 * de autenticación y, según la respuesta, redirige al dashboard o re-renderiza
 * el formulario de login mostrando un mensaje de error.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
exports.processLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Llama al servicio que consume la API de autenticación
        const response = await authService.login(email, password);
        const { token } = response.data;

        // Guarda el token en la sesión (o en una cookie, según la estrategia)
        req.session.token = token;

        // Redirige al usuario al dashboard en caso de autenticación exitosa
        res.redirect('/dashboard');
    } catch (error) {
        // Extrae el mensaje de error de la respuesta de la API, si existe
        const errorMsg = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : 'Error al iniciar sesión';

        // Re-renderiza el formulario de login con el mensaje de error
        res.render('pages/login', { title: 'Iniciar Sesión', error: errorMsg });
    }
};