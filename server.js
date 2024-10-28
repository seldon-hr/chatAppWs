const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

/* Rutas y errorHandler */
/* const routes = require('../routes/')
const errorHandler = require('../middlewares/errorHandler') */

dotenv.config();

//Iniciar app de express
const app = express();


//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//Connect to database
connectDB();

/* //Routes
app.get('/', (req, res) => {
    res.send('Chat App Ws is running');
}); */



//Inicio del servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000
        });
        console.log('MongoDB connected: ', connection.connection.host);
    } catch (error) {
        console.error('MongoDB connection error: ', error);
        process.exit(1);
    }
};

module.exports = connectDB;


