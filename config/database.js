const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        })
        console.log('MongoDB connected');

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


    } catch (error) {
        console.error('MongoDB connection main error: ', error);
        process.exit(1);
    }
};

module.exports = connectDB;