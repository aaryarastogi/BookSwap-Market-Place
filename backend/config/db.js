import mongoose from "mongoose";

const connectDB=async()=>{
    const URL= `mongodb+srv://aaryarastogi0110_db_user:bookswapmarketplace@cluster0.qluj1zx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    try {
        await mongoose.connect(URL,{});
        console.log('connected to mongodb')
    } catch (error) {
        console.log('error while connecting with database',error.message);
    }
}

export default connectDB;