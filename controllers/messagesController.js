const Message = require("../models/Message");

/* Get messages by channel */
exports.getMessagesByChannel = async (request, response) => {
    const { channelId } = request.body;
    
    try {
        const messagesQuery = await Message.find({ channelId });
        console.debug('Retorno', messagesQuery);

        // ✅ Corregir: era 'messages.mapa' y 'messages' no estaba definido
        const messages = messagesQuery.map(m => m.toPublicJSON());

        response.status(200).json({
            success: true, // ✅ Corregir: era 'succes'
            body: messages,
        });

    } catch (error) {
        console.log('Error al obtener los mensajes del canal.', error);
        response.status(500).json({
            success: false,
            message: 'Error en el servidor',
        });
    }
}