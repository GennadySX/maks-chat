const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    rooms: [{
        type: String,
        ref: 'Room',
    }],
    create_at: {
        type: Date,
        default: Date.now
    },
    name: String,
    is_admin: Boolean,
});

mongoose.model('User', UserSchema)