const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');
const { getUserById, getUsers } = require('../controllers/getUsersController');
const { protect } = require('../middleware/authMiddleware');

/* Rutas Públicas */
router.post('/login', login);
router.post('/getUserById', getUserById);
router.get('/getUsers', getUsers);


/* Rutas Privadas */
router.post('/logout', protect, logout);


/* Exportar rutas */
module.exports = router;