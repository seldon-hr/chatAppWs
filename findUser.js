const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/database');
const dotenv = require('dotenv');

const axios = require('axios');
const API_URL = 'http://localhost:5000/api';

dotenv.config();

const findUserByUsername = async (username) => {
    try {
        console.log('Intentando conectar a MongoDB...');
        await connectDB(); // Usar la función connectDB en lugar de mongoose.connect);
        console.log('✅ Conectado exitosamente a MongoDB');

        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found');
        } else {
            console.log('User found:', user.toPublicJSON());
            /* await User.deleteOne({ _id: user._id });
            console.log('🧹 User deleted'); */
        }
    } catch (error)  {
        console.log('Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n👋 Conexión cerrada');
    }
};

// Example usage// Example usage
/* findUserByUsername('mattwalker'); */



// Test de Login
const getUsers = async () => {
    try {
        console.log('🚀 Iniciando prueba de getUsers\n');

        const usersResponse = await axios.get(`${API_URL}/getUsers`);
        

        console.log('✅ Petición exitosa');
        console.log('User:', usersResponse);

        
        
    } catch (error) {
        /* console.log(error.response); */
        console.error('❌ Error code:', error.code);
    }
};

getUsers();