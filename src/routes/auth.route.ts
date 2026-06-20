import express from "express";
import z from "zod";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const route = express.Router();

const signupSchema = z.object({
  username: z.string().min(3),
  password: z
    .string()
    .min(6)
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

route.post("/signup", async (req, res) => {
  const { data, success } = signupSchema.safeParse(req.body);

  if (!success) {
    return res.status(403).json({
      message: "Invalid Inputs",
    });
  }

  const username = data.username;
  const password = data.password;

  const userExist = await userModel.findOne({
    username,
  });

  if (userExist) {
    return res.status(409).json({
      message: "User is Already Exist in the Server",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRATE!,
  );

  res.cookie("token", token);

  res.status(201).json({
    messsage: "User is Created successfully",
    token: token,
    user: {
      id: user._id,
      username: user.username,
    },
  });
});

route.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username,
  });

  if (!user) {
    return res.status(403).json({
      message: "Invalid Credentials",
    });
  }

  const isPasswordisValid = await bcrypt.compare(password, user.password);

  if (!isPasswordisValid) {
    return res.status(409).json({
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRATE!,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    token: token,
    user: {
      id: user._id,
      username: user.username,
    },
  });
});

export default route;
