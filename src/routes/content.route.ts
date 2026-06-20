import express from "express";
import { userMiddleware } from "../middleware/auth.middleware.js";
import contentModel from "../models/content.model.js";

const route = express.Router();

route.post("/content", userMiddleware, async (req, res) => {
  const title = req.body.title;
  const link = req.body.link;

  try {
    await contentModel.create({
      title,
      link,
      userId: req.userId!,
      tags: [],
    });
    res.status(201).json({ message: "Content created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create content" });
  }
});

route.get("/content", userMiddleware, async (req, res) => {
  const userId = req.userId;
  if (!req.userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    
    const content = await contentModel.find({
        userId: userId!,
    })

    res.json({ content });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default route;
