import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Ajout de l'interface pour typer req.user
interface CustomRequest extends Request {
  user?: {
    role: string;
    [key: string]: any; // Permet d'ajouter d'autres propriétés si nécessaire
  };
}

// Middleware pour vérifier le token JWT
const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token manquant, accès non autorisé." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key") as JwtPayload;

    // Attache les données décodées au `req.user`
    req.user = decoded as { role: string };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide, accès non autorisé." });
  }
};

export default verifyToken;
