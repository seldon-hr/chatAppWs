const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { login, logout } = require('../controllers/authController');
const { getUserById, getUsers } = require('../controllers/getUsersController');
const { getChannelsByUser } = require('../controllers/channelsController');
const { getChat } = require('../controllers/chatAIController');
const { getMessagesByChannel } = require('../controllers/messagesController');


/* Rutas Públicas */
router.post('/login', login);
router.post('/getUserById', getUserById);
router.post('/getUsers', getUsers);
router.post('/getMessagesByChannel', getMessagesByChannel)

/* Rutas Privadas */
router.post('/logout', protect, logout);
router.post('/getChannelsByUser', protect, getChannelsByUser);

//Chat Gemini
router.post('/getChat', protect, getChat);


/* Exportar rutas */
module.exports = router;
/* console.debug(`Rutas Actuales: ${router}`); */