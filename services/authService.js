/**
 * services/authService.js
 *
 * Servicio para interactuar con la API de autenticación.
 * Utiliza Axios para enviar peticiones HTTP a la API.
 */

const axios = require('axios');

// URL base del microservicio de autenticación
const API_BASE_URL = process.env.AUTH_API_URL || 'http://localhost:4000';


//funcion que se conecta con la api de autenticacion para hacer un login

/**
 * Realiza una petición POST al endpoint de login de la API de autenticación.
 *
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise} - Promesa que se resuelve con la respuesta de la API.
 */
exports.login = (email, password) => {
    return axios.post('http://localhost:4000/auth/login', { email, password });
};

//funcion que se conecta con la api de autenticacion para hacer un registro

/**
 * Realiza una petición POST al endpoint de registro de la API de autenticación.
 *
 * @param {string} username - Nombre de usuario.
 * @param {string} email - Correo electrónico.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise} - Promesa que se resuelve con la respuesta de la API.
 */
exports.register = (username, email, password) => {
    return axios.post('http://localhost:4000/auth/register', { username, email, password });
};

//funcion que se conecta con la api de autenticacion para validar el token

/**
 * Valida un token JWT enviándolo al microservicio de autenticación.
 *
 * @param {string} token - El JWT que se desea validar.
 * @returns {Promise<Object>} - La respuesta de la API, con los datos del usuario si es válido.
 * @throws {Error} - Lanza un error si no hay token o la API responde con error.
 */
exports.validateToken = async (token) => {
    if (!token) {
        throw new Error('Token no proporcionado para validación');
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/auth/validate`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;  // contiene los datos del usuario y el mensaje

    } catch (error) {
        // Relanza el error para que el controlador lo maneje
        throw new Error(
            error.response?.data?.message || 'Error al validar el token'
        );
    }
};