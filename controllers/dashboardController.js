/**
 * controllers/dashboardController.js
 *
 * Controlador que maneja la visualización del dashboard del usuario.
 * Valida el token almacenado en sesión y, si es válido, renderiza la vista con los datos del usuario.
 */

const authService = require('../services/authService');

/**
 * Muestra el dashboard si el token es válido.
 *
 * @param {Object} req - Objeto de solicitud HTTP (Express)
 * @param {Object} res - Objeto de respuesta HTTP (Express)
 */
exports.showDashboard = async (req, res) => {
    const token = req.session.token;

    if (!token) {
        // Si no hay token en la sesión, redirige al login
        return res.redirect('/users/login');
    }

    try {
        // Llama al microservicio de autenticación para validar el token
        const response = await authService.validateToken(token);

        // Extrae los datos del usuario desde el payload del token
        const userData = response.data.data;

        // Renderiza el dashboard con los datos del usuario
        res.render('pages/dashboard', {
            title: 'Dashboard',
            username: userData.username,
            email: userData.email
        });

    } catch (error) {
        console.error('Error al validar el token:', error.message);

        // Si el token no es válido o expiró, limpia la sesión y redirige al login
        req.session.destroy(() => {
            res.redirect('/users/login');
        });
    }
};