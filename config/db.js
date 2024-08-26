const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Successfully connected to mongoDB 😁`)
    }
    catch (error){
        console.error(`ERROR: ${error.message}`)
    }
}
connectDB();

module.exports = mongoose;