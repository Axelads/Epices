import { Request, Response, NextFunction } from "express";

// Définir un type spécifique pour inclure `user`
interface CustomRequest extends Request {
  user?: { [key: string]: any; role: string };
}

// Middleware pour vérifier si l'utilisateur est un administrateur
const isAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Accès refusé : droits administrateurs requis." });
  }

  next(); // Passe au middleware suivant si l'utilisateur est admin
};

export default isAdmin;
