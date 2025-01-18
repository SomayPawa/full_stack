const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI ;

const connectDb = async () => {
    try {
        await mongoose.connect(URI);  // No need for deprecated options
        console.log('Connection successful to DB');
    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(0);
    }
};

module.exports = connectDb;

