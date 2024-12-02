import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

// Vérification des variables d'environnement
console.log("Configuration TypeORM :", {
  host: process.env.DB_HOST || "Valeur manquante",
  port: process.env.DB_PORT || "Valeur manquante",
  username: process.env.DB_USER || "Valeur manquante",
  password: process.env.DB_PASSWORD || "Valeur manquante",
  database: process.env.DB_NAME || "Valeur manquante",
});

// Importer les entités
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";

// Configuration de la source de données TypeORM
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST, // Adresse MySQL
  port: Number(process.env.DB_PORT), // Port MySQL
  username: process.env.DB_USER, // Utilisateur MySQL
  password: process.env.DB_PASSWORD, // Mot de passe
  database: process.env.DB_NAME, // Nom de la base
  entities: [User, Product, Order, OrderItem], // Liste des entités
  synchronize: false, // Synchroniser les schémas automatiquement (désactiver en production)
  logging: true, // Permet de voir les requêtes SQL générées par TypeORM
});

// Initialisation de la base de données
AppDataSource.initialize()
  .then(() => {
    console.log("Connexion à la base de données réussie !");
  })
  .catch((error) => {
    console.error("Erreur lors de la connexion à la base de données :", error);
  });
