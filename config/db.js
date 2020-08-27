const mongoose = require("mongoose");
require('dotenv').config({ path: 'variables.env' });

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("DB is connected")
    } catch (error) {
        console.log(error);
        process.exit(1); //stops the app
    }
}

module.exports = connectDB