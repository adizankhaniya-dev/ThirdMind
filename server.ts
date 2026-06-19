import app from "./src/index";
import dotenv from "dotenv";
import connectDB from "./src/db/db";

connectDB();

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
