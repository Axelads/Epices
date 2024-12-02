import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token manquant." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.body.userId = (decoded as { userId: number }).userId;
    next();
  } catch (error) {
    res.status(403).json({ message: "Token invalide." });
  }
};
