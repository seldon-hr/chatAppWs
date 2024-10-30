const jsonWebToken = require('jsonwebtoken');
const User = require('../models/User');



exports.protect = async (req, res, next) => {
    try {
        let token;

        // Verificar si hay token en los headers
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // Verificar si el token existe
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No autorizado para acceder a esta ruta'
            });
        }

        try {
            // Verificar token
            const decoded = jsonWebToken.verify(token, process.env.JWT_SECRET);

            // Obtener usuario del token
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'No se encontró el usuario'
                });
            }

            // Agregar usuario a la request
            req.user = user;
            next();

        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Token inválido'
            });
        }
    } catch (error) {
        console.error('Error en middleware de autenticación:', error);
        res.status(500).json({
            success: false,
            message: 'Error en el servidor'
        });
    }
};