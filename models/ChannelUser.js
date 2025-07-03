//Modelando CanalUser
const mongoose = require('mongoose');

const channelUserSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true,
    },
    joinedAt: {
        type: Date,
        default: Date.now,
    },
    lastMessageReadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    notificationsMute: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

//Creación de índices únicos
/* 
Esta es entidad intermedia entre User:Channels, un N:M
tenemos que considerar que no exista la duplicidad de información.
Para esto, existe que creamos un índice compuesto.
*/
channelUserSchema.index({ userId: 1, channelId: 1 }, { unique: true });
/* Entonces, esto se traduce a que solo puede haber un registro, de un userId con el channelId,
    user: Erik
    channel: OPL
    -> Erik, OPL, solo puede haber un registro así, esto evita duplicidad de registros.
*/

channelUserSchema.methods.toPublicJSON = function () {
    return {
        userId: this.userId,
        channelId: this.channelId,
        joinedAt: this.joinedAt,
        lastMessageReadId: this.lastMessageReadId,
        notificationsMute: this.notificationsMute,
    }
}


module.exports = mongoose.model('ChannelUser', channelUserSchema);