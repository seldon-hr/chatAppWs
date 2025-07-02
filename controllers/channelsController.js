const Channel = require('../models/Channel');
const ChannelUser = require('../models/ChannelUser');
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
    console.log(`Búsqueda de canales para el usuarios ${request.body.userId}`);
    const { userId } = request.body;
    try {
        // Lista donde vamos a guardar los canales correspondientes al user.
        let channels = [];
        /* TODO: Crear estructura de Channel */
        await ChannelUser.populate({ userId }) //Usando Populate podemos regresar una lista de valores o un solo.
            .then(canales => {
                channels = canales.map(canal => canal.toPublicJSON());
                console.log(`Canales obtenidos:', ${channels.length})`);
            })
            .catch(error => {
                console.log(`Error desde MongoDB al recuperar los canales.`, error);
            })
        
        if (channels.length == 0) {
        return response.status(401).json({
            success: false,
            messages: 'No se encontraron canales.'
        })
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