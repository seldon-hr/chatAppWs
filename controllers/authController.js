const jsonWebToken = require('jsonwebtoken');
const User = require('../models/User');

/* Log In */
exports.login = async (request, response) => {
    try {
        const { username, password } = request.body;
        console.log(username, password);    
                //Validar que se proporcionen usuario y contraseña
        if (!username || !password) {
            return response.status(400).json({
                message: 'Proporciona un usuario y contraseña'
            });
        }

        //Buscar el usuario en la base de datos
        /* .select('+password'):

        .select es un método de Mongoose que se utiliza para especificar qué campos deben ser incluidos o excluidos en el resultado de la consulta.
        '+password' indica que el campo password debe ser incluido en el resultado, incluso si está marcado como select: false en el esquema del modelo.
        En Mongoose, los campos pueden ser excluidos por defecto en el esquema del modelo usando select: false. 
        Esto es útil para campos sensibles como contraseñas, que no deberían ser devueltos por defecto en las consultas. */
        const user = await User.findOne({ username }).select('+password');
        console.log(user);
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
        console.log('error in server');
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
        const user = await User.findById(request.user._id);
        console.log(request.user._id);

        //En caso de que el usuario no exista
        if (!user) {
            return response.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        //Actualizar el estado del usuario
        user.isOnline = false;
        user.lastSeen = new Date();
        await user.save();

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