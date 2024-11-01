const axios = require('axios');
const dotenv = require('dotenv');
const fs = require('fs').promises;
const path = require('path');

dotenv.config();

const API_URL = 'http://localhost:5000/api';

// Archivo para almacenar temporalmente el token
const TOKEN_FILE = path.join(__dirname, 'temp_token.json');

// Función para guardar el token
const saveToken = async (tokenData) => {
    await fs.writeFile(TOKEN_FILE, JSON.stringify(tokenData));
};

// Función para obtener el token guardado
const getToken = async () => {
    try {
        const data = await fs.readFile(TOKEN_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('No se encontró token guardado');
        return null;
    }
};

// Test de Login
const testLogin = async () => {
    try {
        console.log('🚀 Iniciando prueba de login...\n');

        const loginResponse = await axios.post(`${API_URL}/auth/login`, {
            username: 'mattWalker',
            password: 'mattWalker789'
        });
        

        console.log('✅ Login exitoso');
        console.log('Token:', loginResponse.data.token);
        console.log('Usuario:', loginResponse.data.user.username);

        // Guardar el token para uso posterior
        await saveToken(loginResponse.data);
        
    } catch (error) {
        console.error('❌ Error en login:', error.response ? error.response.data : error.message);
    }
};

// Test de Logout
const testLogout = async () => {
    try {
        console.log('🚀 Iniciando prueba de logout...\n');

        // Obtener el token guardado
        const tokenData = await getToken();
        
        if (!tokenData || !tokenData.token) {
            throw new Error('No hay token disponible. Por favor, realiza login primero.');
        }

        const logoutResponse = await axios.post(
            `${API_URL}/auth/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${tokenData.token}`
                },
                body: {
                    username: 'mattWalker'
                }
            }
        );

        console.log('✅ Logout exitoso');
        console.log('Mensaje:', logoutResponse.data.message);

        // Eliminar el token guardado
        await fs.unlink(TOKEN_FILE).catch(() => {});

    } catch (error) {
        console.error('❌ Error en logout:', error.response ? error.response.data : error.message);
    }
};

// Función para limpiar archivos temporales
const cleanup = async () => {
    try {
        await fs.unlink(TOKEN_FILE).catch(() => {});
    } catch (error) {
        // Ignorar errores de limpieza
    }
};

// Permitir elegir la operación desde la línea de comandos
const operation = process.argv[2];

switch (operation) {
    case 'login':
        testLogin();
        break;
    case 'logout':
        testLogout();
        break;
    case 'cleanup':
        cleanup();
        break;
    default:
        console.log(`
Por favor, especifica la operación:
- Para login:   node testAuth.js login
- Para logout:  node testAuth.js logout
- Para limpiar: node testAuth.js cleanup
        `);
}