import mongoose from 'mongoose';

const connectDB = async()=>{
    try {
        const connectionioInstance = await mongoose.connect(
            process.env.MONGODB_URI)
        console.log(`MongoDB connected: ${connectionioInstance.connection.host}`);
    }catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}


export default connectDB;