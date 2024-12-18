const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        /* Al momento de realizar la conexión corroborar que se puede obtener acceso desde un ip disponible,
            de lo contrario checar en el módulo de mongo Atlas -> Network access */
        
        // console.log('process.env.MONGO_URI:', process.env.MONGO_URI);
        const connex = await mongoose.connect(process.env.MONGO_URI, {})
        console.log('MongoDB connected: ', connex.connection.host);

        //Manejo de eventos de conexión
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to DB');
        });

        mongoose.connection.on('error', (err) => {
            console.log('Mongoose connection error', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose connection disconnected');
        });


        //Cerrar la conexión con la base de datos
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            process.exit(0);
        });


    } catch (error) {
        /* Gestión de errores de conexión a la db */
        console.error('MongoDB connection main error: ', error);
        /* Devolver el error si este es a raíz de que la ip no se encuentra en la lista blanca
            de ip's autorizadas */
        const NO_ENCONTRADA_URL_CLUSTER = 'ENOTFOUND';
        const ERROR_CREDENTIALS = error.name === 'MonooseError' && error.message.includes('authentication failed');
        const NO_IP_AUTORIZADA_LISTA_BLANCA = (error.name === 'MongooseServerSelectionError');

        if (error.code === NO_ENCONTRADA_URL_CLUSTER) {
            console.error('Error de DNS: No se encontró la URL del cluster.');
        } else if (ERROR_CREDENTIALS) {
            console.error('Error de Usuario o Contraseña, verficar credenciales.');
        } else if (NO_IP_AUTORIZADA_LISTA_BLANCA) {
            console.error('❗⚠️ Posible IP no autorizada, Verifica la lista bla nca de MongoDB Atlas Netwokr Access');
            console.info('Tu IP actual necesita ser agregada a la whitelist')

             // Podemos intentar obtener la IP pública
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                console.log(response)
                const data = await response.json();
                console.error(`IP a agregar: ${data.ip}`);
            } catch (ipError) {
                console.error('No se pudo obtener la IP pública');
            }
        }

        process.exit(1);
    }
};

module.exports = connectDB;