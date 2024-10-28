const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connex = await mongoose.connect(process.env.MONGO_URI, {})
        console.log('MongoDB connected: ', connex.connection.host);

        //Manejo de eventos de conexión
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connecte to DB');
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
        console.error('MongoDB connection main error: ', error);
        process.exit(1);
    }
};

module.exports = connectDB;