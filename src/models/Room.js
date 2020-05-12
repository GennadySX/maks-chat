const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: String,
    admins: [{
        type: String,
        ref: 'User', 
    }],
    moderators: [{
        type: String,
        ref: 'User', 
    }],
    users: [{
        type: String,
        ref: 'User', 
    }],
    banned: [{
        type: String,
        ref: 'User', 
    }],
    create_at: {
        type: Date,
        default: Date.now,
    },
    chat: [MessageChat],
});

mongoose.model('Room', RoomSchema);