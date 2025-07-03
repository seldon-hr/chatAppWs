const Channel = require('../models/Channel');
const ChannelUser = require('../models/ChannelUser');
const mongoose = require('mongoose');
/* Get Public Channels */
// exports.getChannels = async (request, response) => {
//     console.log('Obtener Canales');
//     try {
//         let channels = [];
//         /* TODO: Crear estructura de Channel */
//         await Channel.find({})
//             .then(canales => {
//                 channels = canales.map(canal => canal.toPublicJSON());
//                 console.log(`Canales obtenidos:', ${channels.length})`);
//             })
//             .catch(error => {
//                 console.log('Error desde MongoDB al recuperar los canales.', error);
//             })
        
//         if (channels.length == 0) {
//             return response.status(401).json({
//                 success: false,
//                 messages: 'No se encontraron canales.'
//             })
//         }
        
//         response.status(200).json({
//             success: true,
//             body: channels
//         }) 
           
//     } catch (error) {
//         console.log('Error al obtener los canales', error);
//         response.status(500).json({
//             success: false,
//             message: 'Error en el servidor',
//         });
//     }
// }



/* Create Channel */
exports.saveChannel = async (channelPrototype) => { 
    const { userId, name } = channelPrototype;
    console.log(`Creando Canal: ${name} by ${userId}` );
    
    try {
        const channel = await Channel.create(channelPrototype);
        console.log(`Channel ${channel.toPublicJSON().name} was created `);
    } catch (error) {
        console.log(`Error al guardar el canal`, error);
    }
}


/* Get Channels by user */
exports.getChannelsByUser = async (request, response) => {
    console.log('🔥 Endpoint getChannelsByUser alcanzado');
    console.log(`Búsqueda de canales para el usuarios ${request.body.userId}`);
    const { userId } = request.body;
    try {
        const channelsUsers = await ChannelUser.find({ userId: new mongoose.Types.ObjectId(userId) })/* .populate('channelId'); */
        console.log(`ChannelUsers encontrados: ${channelsUsers.length}`);

        const channels = channelsUsers
            .filter(channelsUser => channelsUser.channelId)
            .map(channelUser => ({
                ...channelUser.channelId.toPublicJSON(), // Datos del canal
                joinedAt: channelUser.joinedAt, // Datos de la relación
                notificationsMute: channelUser.notificationsMute,
                lastMessageReadId: channelUser.lastMessageReadId
            }));

        console.log(`Canales obtenidos: ${channels.length}`);

        if (channels.length === 0) {
            return response.status(404).json({
                success: false,
                message: 'No se encontraron canales.'
            });
        }

        response.status(200).json({
            success: true,
            body: channels
        }) 
           

    } catch (error) {
        console.log('Error al obtener los canales', error);
        response.status(500).json({
            success: false,
            message: 'Error en el servidor',
        });
    }
}