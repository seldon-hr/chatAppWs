const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_URL = 'http://localhost:5000/api';
const itemRequest = {
    _id: '67216af72de1a5fdf0f69ef6',
}

const testGetUserById = async () => {
    try {
        console.log('🚀 Iniciando prueba de getUserById...\n');
        console.log('itemRequest -> ', itemRequest);
        itemRequest._id.toString();
        const getUserByIdResponse = await axios.post(`${API_URL}/auth/getUserById`, itemRequest);

        console.log('✅ getUserById exitoso');
        console.log('Usuario:', getUserByIdResponse.data.user);

    } catch (error) {
        console.error('❌ Error en getUserById:', error.response ? error.response.data : error.message);
    }
}    

testGetUserById();