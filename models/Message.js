const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
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
    text: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
});

messageSchema.methods.toPublicJSON = function () {
    return {
        userId: this.userId,
        channelId: this.channelId,
        text: this.text,
        time: this.time,
    }
}

module.exports = mongoose.model('Message', messageSchema);

