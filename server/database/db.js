import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log(`Error in coonecting database and error is ${error}`);
    }
    
}

export default connectDB;

