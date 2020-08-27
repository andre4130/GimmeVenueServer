const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true // eliminates blank spaces at the beginning and end of the username
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    register: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', UserSchema);