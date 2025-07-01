const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { login, logout } = require('../controllers/authController');
const { getUserById, getUsers } = require('../controllers/getUsersController');
const { getChannels } = require('../controllers/channelsController');

/* Rutas Públicas */
router.post('/login', login);
router.post('/getUserById', getUserById);
router.post('/getUsers', getUsers);
router.post('/getChannels', getChannels);


/* Rutas Privadas */
router.post('/logout', protect, logout);


/* Exportar rutas */
module.exports = router;