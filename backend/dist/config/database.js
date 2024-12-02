"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
// Charger les variables d'environnement
dotenv_1.default.config();
// Vérification des variables d'environnement
console.log("Configuration TypeORM :", {
    host: process.env.DB_HOST || "Valeur manquante",
    port: process.env.DB_PORT || "Valeur manquante",
    username: process.env.DB_USER || "Valeur manquante",
    password: process.env.DB_PASSWORD || "Valeur manquante",
    database: process.env.DB_NAME || "Valeur manquante",
});
// Importer les entités
const User_1 = require("../entities/User");
const Product_1 = require("../entities/Product");
const Order_1 = require("../entities/Order");
const OrderItem_1 = require("../entities/OrderItem");
// Configuration de la source de données TypeORM
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST, // Adresse MySQL
    port: Number(process.env.DB_PORT), // Port MySQL
    username: process.env.DB_USER, // Utilisateur MySQL
    password: process.env.DB_PASSWORD, // Mot de passe
    database: process.env.DB_NAME, // Nom de la base
    entities: [User_1.User, Product_1.Product, Order_1.Order, OrderItem_1.OrderItem], // Liste des entités
    synchronize: false, // Synchroniser les schémas automatiquement (désactiver en production)
    logging: true, // Permet de voir les requêtes SQL générées par TypeORM
});
// Initialisation de la base de données
exports.AppDataSource.initialize()
    .then(() => {
    console.log("Connexion à la base de données réussie !");
})
    .catch((error) => {
    console.error("Erreur lors de la connexion à la base de données :", error);
});
//# sourceMappingURL=database.js.map