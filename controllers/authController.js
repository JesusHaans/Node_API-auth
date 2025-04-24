/**
 * controllers/authController.js
 *
 * Controlador para manejar la autenticación.
 */

const authService = require('../services/authService');

// Funciones para manejar el inicio de sesión

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

// Funciones para manejar el registro de usuarios.

/**
 * Muestra el formulario de registro.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
exports.showRegister = (req, res) => {
    res.render('pages/register', { title: 'Registro' });
};

/**
 * Procesa el registro del usuario.
 *
 * Extrae los datos del formulario, valida que las contraseñas coincidan,
 * llama al servicio para registrar el usuario y, según la respuesta,
 * redirige al login o re-renderiza el formulario con un mensaje de error.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
exports.processRegister = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        return res.render('pages/register', { title: 'Registro', error: 'Las contraseñas no coinciden' });
    }

    try {
        // Llama al servicio para registrar al usuario
        const response = await authService.register(username, email, password);

        // En caso de registro exitoso, redirige al formulario de login
        res.redirect('/users/login');
    } catch (error) {
        // Extrae el mensaje de error de la respuesta de la API (si existe)
        const errorMsg = error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : 'Error al registrarse';

        // Re-renderiza la vista de registro con el mensaje de error
        res.render('pages/register', { title: 'Registro', error: errorMsg });
    }
};