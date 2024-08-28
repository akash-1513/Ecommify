const mongoose = require('mongoose')
const {db_name} = require('../constants')

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${db_name}`);
        console.log("MongoDB connected successfully | HOST: ", connectionInstance.connection.host)
    } catch(error) {
        console.log("Error in connecting to mongoDB", error);
    }
}

module.exports = {connectDB}