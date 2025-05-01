const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Ruta protegida del dashboard
router.get('/', dashboardController.showDashboard);

module.exports = router;