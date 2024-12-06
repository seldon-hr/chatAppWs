const dotenv = require('dotenv');
const path = require('path');

// Configurar dotenv
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('Variables de entorno cargadas:');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);