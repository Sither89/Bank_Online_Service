const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({ 
    Username : {type: String , unique: true},
    Password : String,
    firstName : String,
    lastName : String,
    Account_Amount : Number
});

module.exports = mongoose.model('User', userSchema);