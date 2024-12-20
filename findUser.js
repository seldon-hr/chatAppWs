const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

/* Lectura y carga de las variables al 'process.env'  */
dotenv.config({ path: '../.env'});
/* console.log(dotenv.config()); */

const findUserByUsername = async (username) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found');
        } else {
            console.log('User found:', user.toPublicJSON().username);
        }
    } catch (error) {
        console.log('Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n👋 Conexión cerrada');
        process.exit();
    }
};

// Example usage
findUserByUsername('mattWalker');

