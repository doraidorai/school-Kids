const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    pwd: String,
    tel:String,
    telSon:String,
    address:String,
    speciality:String,
    cv:String,
    avatar:String,
    role: String,
    status:String,
    about:String,
});

const user = mongoose.model('User',userSchema);

module.exports= user;