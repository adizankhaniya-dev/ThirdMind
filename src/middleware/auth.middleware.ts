import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const userMiddleware = (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers["authorization"];

  try {
    const decoded = jwt.verify(header as string, process.env.JWT_SECRATE!) as {
      id: string;
    };
    if (decoded) {
      req.userId = decoded.id;
      return next();
    }
    res.status(401).json({
      Error: "Invalid token",
    });
  } catch (error) {
    res.status(401).json({
      Error: "Unauthorized",
    });
  }
};
