const mongoose = require("mongoose");

const tranSchema = new mongoose.Schema({
    Datetime : Date,
    User: String,
    Remain: String,
    Action: String,
    From: String,
    Amount: String
});

module.exports = mongoose.model('Transaction', tranSchema);