import express from "express";
import authRoute from "./routes/authRoute.js";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

app.post("/auth", authRoute);

export default app;
