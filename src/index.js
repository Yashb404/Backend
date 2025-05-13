import connectDB from "./db/index.js";
import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server running at : ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed ", err);
})
























/*
import express from "express";
const app = express(); 

(async () => {
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", () => {
            console.log("Error connecting to MongoDB");
            throw error;
        });

        app.listen(process.env.PORT, () => {
            console.log(`App listening on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
})();
*/