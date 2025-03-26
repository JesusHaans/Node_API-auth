/* 
    Archivo: controllers/homeController.js
    Descripción: Controlador que maneja la lógica de la ruta de inicio.
    Contiene funciones que responden a las peticiones HTTP y renderizan las vistas correspondientes.
*/

// Función que maneja la solicitud GET para la ruta raíz ('/')
exports.index = (req, res) => {
    // Renderiza la vista 'index.ejs' ubicada en la carpeta 'views'
    // Se pasa un objeto con datos (en este caso, el título) que podrán ser utilizados dentro de la plantilla
    res.render('pages/index', { title: 'Pagina de Inicio' });
};