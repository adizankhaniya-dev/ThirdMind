import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://zankhaniyaadi2006_db_user:ea6wlRH14TSZcuxz@projects.daqkvy3.mongodb.net/ThreeBrain");
    console.log("Database is connect Successfully");
  } catch (error) {
    console.log("Error while connecting DB", error);
  }
}

export default connectDB;
