const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


const userSchema = new mongoose.Schema({
    username: String,
    email: String,
}, {
    timestamps: true,
    collection: 'users' // Colección en donde se inserta el documento
 });

const User = mongoose.model('TestUser', userSchema); 
console.log('process.env.MONGO_URI:', process);
const testTimestamps = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Conectado a MongoDB');

        // 1. Crear un nuevo usuario
        const user = await User.create({
            username: 'esanchez',
            email: 'test@example.com'
        });

        console.log('\n1. Usuario recién creado:');
        console.log('📅 createdAt:', user.createdAt.toLocaleString());
        console.log('📅 updatedAt:', user.updatedAt.toLocaleString());

        // Esperar 2 segundos
        console.log('\n⏳ Esperando 2 segundos...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 2. Actualizar el usuario
        user.email = 'updated@example.com';
        await user.save();

        console.log('\n2. Usuario después de actualizar:');
        console.log('📅 createdAt:', user.createdAt.toLocaleString());
        console.log('📅 updatedAt:', user.updatedAt.toLocaleString());

        // Mostrar la diferencia
        console.log('\n3. Análisis de timestamps:');
        console.log('❓ ¿Son diferentes createdAt y updatedAt?:', 
            user.createdAt.getTime() !== user.updatedAt.getTime() ? '✅ Sí' : '❌ No');
        console.log('⏱️  Diferencia en segundos:', 
            Math.round((user.updatedAt - user.createdAt)/1000));

        // Limpiar
        await User.deleteOne({ _id: user._id });
        console.log('\n🧹 Usuario de prueba eliminado');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n👋 Conexión cerrada');
        process.exit();
    }
};

console.log('🚀 Iniciando prueba de timestamps...\n');
testTimestamps();