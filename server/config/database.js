const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGO_CONNECTION_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        dbName: process.env.DB_NAME
    })
    .then( () => console.log("Connected to MongoDB successfuly. "))
    .catch( (error) => {
        console.log("Error while connecting to the database!! ");
        console.error(error);
        process.exit(1);
    })
}; 