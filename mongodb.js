import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const connectDb=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log('db connected')
    }catch(error){
        console.error(`db connection failed :${error.message}`)
        process.addUncaughtExceptionCaptureCallback(1)
    }
}
export default connectDb