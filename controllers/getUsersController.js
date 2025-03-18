/* const jsonWebToken = require('jsonwebtoken'); */
const User = require('../models/User');

/* Get User by ID */
exports.getUserById = async (request, response) => {
    try {
        const { _id } = request.body;
        console.log('_id: ' + _id);
        //Buscar el usuario en la base de datos
        //TODO: Se tiene que hacer la consulta a la capa de repositorio
        const user = await User.findById({ _id });
        /* 
        En el siguiente ejemplo consiste en devolver por id, como en 
        mongoDB, los id son únicos, de tipo ObjectId, se manejan particularmente
        con el método findById, en caso de que se quiera buscar por otro campo
        hacemos uso de findOne y el parámetro por el cual buscar, por ejemplo:
             const user = await User.findOne({ username });
        donde estamos buscando por el campo username
        */

        //Validar que el usuario exista
        if (!user) {
            return response.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        response.status(200).json({
            success: true,
            user: user.toPublicJSON()
        });

    } catch (error) {
        console.error('Error en getUserById', error);
        response.status(500).json({
            success: false,
            message: 'Error en el servidor',
        });
    }
}    

exports.getUsers = async (request, response) => {
    console.log('Intentando inicializador...');

    try {
        let users = [];

        await User.find({})
            .then(usuarios => {
                // Assign the users from the database to the users array
                users =  usuarios.map(usuario => usuario.toPublicJSON());
                console.log('Usuarios obtenidos:', users.length);
            })
            .catch(error => {
                console.error('Error obteniendo desde MoongoDB', error);
            })


        if (users.length == 0) {
            return response.status(401).json({
                success: false,
                messages: 'No se encontraron usuarios.'
            })
        }

        response.status(200).json({
            success: true,
            body: users
        })


    } catch (error) {
        console.error('Error en petición getUsers', error);
        response.status(500).json({
            success: false,
            message: 'Error en el servidor',
        });
    }
}