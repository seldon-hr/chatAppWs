const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');


//Configuración de variables de entorno
dotenv.config();

//Iniciar app de express
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connect to database
connectDB();

//Routes
app.use('/api/auth', require('./routes/auth.routes'));

//Manejo de errores globales
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({
        success: false,
        message: error.message || 'Server Error',
        status: process.env.NODE_ENV === 'development' ? error : {},
    });
});



//Inicio del servidor
const PORT = process.env.PORT || 5000;
const server =  app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

//Manejo de errores no capturados
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //Cerrar el servidor y salir del proceso
    server.close(() => process.exit(1));
});


