import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI !);
    console.log("Database is connect Successfully");
  } catch (error) {
    console.log("Error while connecting DB", error);
  }
}

export default connectDB;
