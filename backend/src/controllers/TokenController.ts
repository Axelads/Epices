import { Request, Response } from "express";
import jwt from "jsonwebtoken";

// Fonction pour gérer la génération du token avec la méthode GET
export const generateTokenWithQuery = (req: Request, res: Response) => {
  const { role } = req.query; // Extrait le rôle depuis la requête

  if (!role) {
    return res.status(400).json({ message: "Le rôle est requis dans la requête." });
  }

  const token = jwt.sign({ id: 1, role }, process.env.JWT_SECRET as string, {
    expiresIn: "1h", // Token valide pour 1 heure
  });

  res.json({ token });
};

// Fonction pour gérer la génération du token avec la méthode POST
export const generateTokenWithBody = (req: Request, res: Response) => {
  const { role, id } = req.body; // Extrait le rôle et l'ID depuis le corps de la requête

  if (!role || !id) {
    return res.status(400).json({ message: "Le rôle et l'ID sont requis dans le corps de la requête." });
  }

  const token = jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: "1h", // Token valide pour 1 heure
  });

  res.json({ token });
};
