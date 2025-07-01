/* Get Channels */
exports.getChannels = async (request, response) => {
    console.log('Obtener Canales');
    try {
        let channels = [];
        /* TODO: Crear estructura de Canal */
        await Canal.find({})
            .then(canales => {
                channels = canales.map(canal => canal.toPublicJSON());
                console.log(`Canales obtenidos:', ${channels.length})`);
            })
            .catch(error => {
                console.log('Error desde MongoDB al recuperar los canales.', error);
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




/* Get Channels by user */
exports.getChannelsByUser = async (request, response) => {
    console.log(`Bùsqueda de canales para el usuarios ${request.userId}`);
    try {
        let channels = [];
        /* TODO: Crear estructura de Canal */
        await Canal.find({}) //Incorporar el body del usuario.
            .then(canales => {
                channels = canales.map(canal => canal.toPublicJSON());
                console.log(`Canales obtenidos:', ${channels.length})`);
            })
            .catch(error => {
                console.log('Error desde MongoDB al recuperar los canales.', error);
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