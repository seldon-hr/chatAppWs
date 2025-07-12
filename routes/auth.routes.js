const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { login, logout } = require('../controllers/authController');
const { getUserById, getUsers } = require('../controllers/getUsersController');
const { getChannelsByUser } = require('../controllers/channelsController');
const { getChat } = require('../controllers/chatAIController');


/* Rutas Públicas */
router.post('/login', login);
router.post('/getUserById', getUserById);
router.post('/getUsers', getUsers);

/* Rutas Privadas */
router.post('/logout', protect, logout);
router.post('/getChannelsByUser', protect, getChannelsByUser);

//Chat Gemini
router.post('/getChat', protect, getChat);


/* Exportar rutas */
module.exports = router;
/* console.debug(`Rutas Actuales: ${router}`); */