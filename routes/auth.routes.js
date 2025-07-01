const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { login, logout } = require('../controllers/authController');
const { getUserById, getUsers } = require('../controllers/getUsersController');
const { getChannelsByUser } = require('../controllers/channelsController');

/* Rutas Públicas */
router.post('/login', login);
router.post('/getUserById', getUserById);
router.post('/getUsers', getUsers);

/* Rutas Privadas */
router.post('/logout', protect, logout);
router.post('/getChannels', protect, getChannelsByUser);

/* Exportar rutas */
module.exports = router;