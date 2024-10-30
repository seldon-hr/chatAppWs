const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');
const { getUserById } = require('../controllers/getUsersController');
const { protect } = require('../middleware/authMiddleware');

/* Rutas Públicas */
router.post('/login', login);
router.post('/getUserById', getUserById);


/* Rutas Privadas */
router.post('/logout', protect, logout);


/* Exportar rutas */
module.exports = router;