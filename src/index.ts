import express from "express";
import authRoute from "./routes/auth.route.js";
import contentRoute from "./routes/content.route.js"

const app = express();
app.use(express.json());

app.use("/auth", authRoute);
app.use("/api/v1", contentRoute);

export default app;
