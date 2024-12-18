const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');

/* Lectura y carga de las variables al 'process.env'  */
dotenv.config({ path: '../.env'});
console.log(dotenv.config());


const testUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Conectado a MongoDB');

        //Incrementar el id
        /* Todos los métodos que se emplean después de User, o de una instancia de esta
            puenden ser empleaos, así como este ejemplo. */
        const nextId = await User.generateNextId();

        //Crear un nuevo usuario
        const userPrototype = {
            id: nextId,
            name: "Juan Rosales",
            username: "juan",
            password: "juan123·9dl",
            email: "matt.walker@berkeley.edu",
            address: {
                street: "Center for Human Sleep Science",
                suite: "Room 3333",
                city: "Berkeley",
                zipcode: "94720",
                geo: {
                    lat: "37.8719",
                    lng: "-122.2585"
                }
            },
            phone: "1-510-555-0123",
            website: "sleepdiplomat.com",
            company: {
                name: "UC Berkeley",
                catchPhrase: "Unlocking the science of sleep",
                bs: "research sleep patterns and cognitive function"
            }
        };

        //Crear un nuevo usuario
        const user = await User.create(userPrototype);
        console.log('User was created:', user.toPublicJSON().username);

        //Verificar la encriptación del usuario
        const userWithPassword = await User.findById(user._id).select('+password');
        console.log('Password encriptado:', userWithPassword.password);

        //Corroborar la compración de contraseñas 
        const isMatch = await userWithPassword.comparePassword('juan123·9dl');
        console.log('Password match:', isMatch);

        //Limpiar
        await User.deleteOne({ _id: user._id });
        console.log('\n🧹 Usuario de prueba eliminado');


    } catch (error) {
        console.log('Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n👋 Conexión cerrada');
        process.exit();
    }
};

console.log('Inicio de testing User');
testUser();