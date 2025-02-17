const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/database');
const dotenv = require('dotenv');

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
        await mongoose.connection.close();ongoose.connection.close();
        console.log('\n👋 Conexión cerrada');
    }
};

// Example usage// Example usage
findUserByUsername('mattwalker');
