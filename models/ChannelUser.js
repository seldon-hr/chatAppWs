//Modelando CanalUser
const mongoose = require('mongoose');

const channelUserSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
    },
    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        unique: true,
    },
    joinedAt: {
        type: Date,
        default: Date.now,
    },
    lastMessageReadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        unique: true,
    },
    notificationsMute: Boolean,
}, {
    timestamps: true,
});

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