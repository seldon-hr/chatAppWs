//Modelado del usuario
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Esquema de usuario
const userSchecma = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Favor de agregar un nombre'],
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Favor de agregar un nombre de usuario'],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Favor de agregar un correo electrónico'],
        unique: true,
        trim: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Favor de agregar un correo electrónico válido']
    },
    address: {
        street: String,
        suite: String,
        city: String,
        zipcode: String,
        geo: {
            lat: String,
            lng: String
        }
    },
    phone: String,
    website: String,
    company: {
        name: String,
        catchPhrase: String,
        bs: String
    },
    avatar: {
        type: String,
        default: 'default-avatar.png'
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    lastSeen: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        required: [true, 'Favor de agregar una contraseña'],
        minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
        select: false // No incluir password en las consultas por defecto
    }
},{
    timestamps: true
});

//Encriptar contraseña antes de guardar: Middleware
userSchecma.pre('save', async function(next){
    //Si la contraseña no ha sido modificada, continuar
    if(!this.isModified('password')){
        next();
    }

    try {
        //Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

//Método para comparar contraseñas
userSchecma.methods.comparePassword = async function(receivedPassword){
   try {
       return await bcrypt.compare(receivedPassword, this.password);
   } catch (error) {
       return false;
   }
}

//Método para obtener la información pública del usuario
userSchecma.methods.toPublicJSON = function() {
    return {
        id: this.id,
        name: this.name,
        username: this.username,
        email: this.email,
        address: this.address,
        phone: this.phone,
        website: this.website,
        company: this.company,
        avatar: this.avatar,
        isOnline: this.isOnline,
        lastSeen: this.lastSeen
    };
};

// Método estático para generar el siguiente ID
userSchecma.statics.generateNextId = async function() {
    const lastUser = await this.findOne().sort('-id');
    return lastUser ? lastUser.id + 1 : 1;
};

//Exportar el modelo
module.exports = mongoose.model('User', userSchecma);