const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

/* Lectura y carga de las variables al 'process.env'  */
dotenv.config({ path: './.env'});
/* console.log(dotenv.config()); */

const readUsers = async () => {
    try {
        /* Iniciando conexión con DB */
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Conectado a MongoDB');

        const filePath = path.join(__dirname, 'listUsers.json');

        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        const jsonUsers = fs.readFileSync(filePath, 'utf8');
        const listUsers = JSON.parse(jsonUsers);

        // Option 1: Using for...of loop (recommended for clarity)
        /* Ventaja al usuar en vez de forEach. For Each no es asìncrono. */
        for (const user of listUsers) {
            console.log('Trying to register', user.username);
            await registerUser(user);
        }
        
        // Option 2: Using Promise.all (faster as operations run in parallel)
        // await Promise.all(listUsers.map(async (user) => {
        //     console.log('Trying to register', user.username);
        //     await registerUser(user);
        // }));
        
    } catch (error) {
        console.log('Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n👋 Conexión cerrada');
        process.exit();
    }
};

const registerUser = async (userPrototype) => {
    try {
        //Incrementar el id
        /* Todos los métodos que se emplean después de User, o de una instancia de esta
            puenden ser empleaos, así como este ejemplo. */
        const nextId = await User.generateNextId();
        userPrototype.id = nextId;

        //Crear un nuevo usuario
        const user = await User.create(userPrototype);
        console.log('User was created:', user.toPublicJSON().username);

        //Verificar la encriptación del usuario
        const userWithPassword = await User.findById(user._id).select('+password');
        console.log('Password encriptado:', userWithPassword.password);

        /* //Corroborar la compración de contraseñas 
        const isMatch = await userWithPassword.comparePassword('mattWalker');
        console.log('Password match:', isMatch); */


    } catch (error) {
        console.log('Error al registrar el usario', error);
    }
}

console.log('Inicio de testing User');
readUsers();