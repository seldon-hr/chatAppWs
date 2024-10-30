const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

/* Rutas Públicas */
router.post('/login', login);


/* Rutas Privadas */
router.post('/logout', protect, logout);


/* Exportar rutas */
module.exports = router;