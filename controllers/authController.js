const jsonWebToken = require('jsonwebtoken');
const User = require('../models/User');

/* Log In */
exports.login = async (request, response) => {
    try {
        const { username, password } = request.body;

        //Validar que se proporcionen usuario y contraseña
        if (!username || !password) {
            return response.status(400).json({
                message: 'Proporciona un usuario y contraseña'
            });
        }

        //Buscar el usuario en la base de datos
        const user = await User.findOne({ username }).select('+password');

        //Validar que el usuario exista
        if (!user) {
            return response.status(401).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        //Validar la contraseña
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return response.status(401).json({
                success: false,
                message: 'Contraseña incorrecta',
            });
        }

        /* Una vez que hacemos los valores base, pasamos a agregar valores en otras propiedades */
        user.isOnline = true;
        user.lastSeen = new Date();
        await user.save();

        //Generar JWT
        const token = jsonWebToken.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        //Una vez que tenemos todo estos valores, pasamos a enviar la respuesta
        response.status(200).json({
            success: true,
            token,
            user: user.toPublicJSON()
        });

    } catch (error) {
        console.error('Error en el login', error);
        response.status(500).json({
            success: false,
            message: 'Error en el servidor',
        });
    }
};

/* LogOut */
exports.logout = async (request, response) => {
    try {
        const user = await User.findById(request.user.id);

        //Actualizar el estado del usuario
        if (user) {
            user.isOnline = false;
            user.lastSeen = new Date();
            await user.save();
        }

        response.status(200).json({
            success: true,
            message: 'Sesión cerrada exitosamente',
        });

    } catch (error) {
        console.error('Error en el logout', error);
        response.status(500).json({
            success: false,
            message: 'Error en el servidor',
        });
    }
};