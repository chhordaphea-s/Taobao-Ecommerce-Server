const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        unique: true,
        require: true
    },
    firstname: {
        type:String,
        unique: false,
        required :true,
    },
    lastname: {
        type:String,
        unique: false,
        required :true,
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },

},
{
    timestamp: true
})
const users = mongoose.model("users", userSchema);
module.exports = users;