const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    author: {
        type: String,
        ref: 'User',
    },
    user: {
        type: String,
        ref: 'User',
    },
    room: {
        type: String,
        ref: 'Room',
    },
    create_at: {
        type: Date,
        default: Date.now,
    },
    text: String,
    unread: {
        type: Boolean,
        default: false,
    },
});

mongoose.model('Message', MessageSchema);