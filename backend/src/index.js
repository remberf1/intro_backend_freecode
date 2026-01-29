import dotenv from 'dotenv';
import connectDB from './config/database.js';
import app from './app.js';
dotenv.config({
    path:'backend/.env'
});

const startServer = async () => {
    try{
        await connectDB();
        app.on("error", (error) => {
            console.error("Server error:", error);
        });
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port ${process.env.PORT || 3000}`);
        });
    }
    catch(error){
        console.error('Failed to start server:', error);
    }
}

startServer();