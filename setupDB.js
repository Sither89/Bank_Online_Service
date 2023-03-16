// Requiring module
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

var host;
process.env.STATUS === 'production'
  ? (host = process.env.DEV_HOST)
  : (host = process.env.PROD_HOST);
// Connection URL
const url = 'mongodb://'+host+':27017/BankDB';
console.log(url);

const setupDB = async () => {
  try {
      const conn = await mongoose.connect(url, {    useNewUrlParser: true, useUnifiedTopology: true});
      console.log(`MongoDB Connected: `,url);

        const user = [{
          Username: "User",
          Password: "$2a$10$Yv2T0rLxvbWxHSDPLHBWduIvQlEte8lhgvFInKP9W8TtcpOPhHl9O",
          firstName: "UserFirstName",
          lastName: "UserLastName",
          Account_Amount : 1000
        },{
          Username: "User2",
          Password: "$2a$10$Yv2T0rLxvbWxHSDPLHBWduIvQlEte8lhgvFInKP9W8TtcpOPhHl9O",
          firstName: "User2FirstName",
          lastName: "User2LastName",
          Account_Amount : 0
        },{
          Username: "Teerat89",
          Password: "$2a$10$Yv2T0rLxvbWxHSDPLHBWduIvQlEte8lhgvFInKP9W8TtcpOPhHl9O",
          firstName: "Teerat",
          lastName: "Sriprasert",
          Account_Amount : 100000
        }]

     //insert data to collection once only 
      if((await User.find()).length === 0){
          await User.insertMany(user);
          console.log("Data Inserted");
      }
  } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
  }
}

module.exports = setupDB;

