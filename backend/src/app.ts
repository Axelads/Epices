import dotenv from "dotenv";
dotenv.config({ path: './.env.test' }); // Charger les variables d'environnement

import express, { Request, Response } from "express";
import { verifyToken, isAdmin, errorHandler } from "./middlewares";
import "reflect-metadata"; // Nécessaire pour TypeORM
import { AppDataSource } from "./config/database";
import userRoutes from "./routes/userRoutes"; // Import des routes utilisateurs
import tokenRoutes from "./routes/tokenRoutes"; // Import de la route pour générer les tokens
import productRoutes from "./routes/productRoutes"; // Import des routes produits

// Déclaration d'un type personnalisé pour inclure `user` dans les requêtes
interface CustomRequest extends Request {
  user?: { [key: string]: any; role: string };
}

console.log("Lancement du serveur...");

// Vérification des variables d'environnement
console.log({
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
});

// Initialisation de la base de données
AppDataSource.initialize()
  .then(() => {
    console.log("Base de données connectée !");
  })
  .catch((error) => console.error("Erreur de connexion à la base de données :", error));

// Création de l'application Express
const app = express();

// Middleware global pour interpréter le JSON dans les requêtes
app.use(express.json());

// Routes utilisateurs
app.use("/users", userRoutes);

// Routes produits
app.use("/products", productRoutes);

// Route pour générer les tokens JWT pour les tests
app.use("/tokens", tokenRoutes);

// Route protégée pour tester les middlewares `verifyToken` et `isAdmin`
app.get("/admin", verifyToken, isAdmin, (req: CustomRequest, res: Response) => {
  const user = req.user; // Accès à l'utilisateur authentifié
  res.send(`Bienvenue, admin ! Role: ${user?.role}`);
});

// Route simple pour tester l'application
app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur le backend e-commerce !");
});

// Middleware global pour gérer les erreurs
app.use(errorHandler);

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
