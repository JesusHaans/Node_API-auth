/**
 * services/authService.js
 *
 * Servicio para interactuar con la API de autenticación.
 * Utiliza Axios para enviar peticiones HTTP a la API.
 */

const axios = require('axios');

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