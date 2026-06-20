import dotenv from "dotenv";
dotenv.config();

import app from "./src/index";
import connectDB from "./src/db/db";

connectDB();

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
