import mongoose from "mongoose";
export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "Instagram",
        });
        console.log("mongodb connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1);        
    }
}