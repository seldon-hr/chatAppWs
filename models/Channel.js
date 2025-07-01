//Modelando Canal
const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    createdBy: {
        type: Number,
        required: true,
        unique: true,
    },
    isPrivate: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true,
});

channelSchema.methods.toPublicJSON = function () {
    return {
        id: this.id,
        name: this.name,
        description: this.description,
        createdBy: this.createdBy,
        isPrivate: this.isPrivate,
    }
}

//Generación de siguiente ID
channelSchema.statics.generateNextId = async function () {
    const lastChannel = await this.findOne().sort('-id');
    return lastChannel ? lastChannel.id + 1 : 1;
}

module.exports = mongoose.model('Channel', channelSchema);