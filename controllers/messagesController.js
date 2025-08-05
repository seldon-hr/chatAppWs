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

/* Create Message into de Channel */
exports.saveMessage = async (request, response) => {
    const messageItem = request.body;


    //Procesar previamente la lógica del mensaje para guardar este.
    try {
        const newMessage = await Message.create(messageItem);
        console.debug(`Message was created ${newMessage}`);

        // ✅ Añadir: Es importante enviar una respuesta al cliente cuando todo sale bien.
        // Usamos 201 para indicar que un recurso fue creado exitosamente.
        response.status(201).json({
            success: true,
            message: "The messages was sent."
        });
    } catch (error) {
        console.log('Error al guardar el mensaje.', error);
        response.status(500).json({
            success: false,
            message: 'Error en el servidor',
        });
    }
}