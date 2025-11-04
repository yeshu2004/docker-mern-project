const { configDotenv } = require("dotenv");
const mongoose = require("mongoose");
configDotenv()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected");
    } catch (error) {
        console.error("mongodb error:", error)
    }
}

module.exports = connectDB