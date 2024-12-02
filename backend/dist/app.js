"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './.env.test' }); // Charger les variables d'environnement
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./middlewares");
require("reflect-metadata"); // Nécessaire pour TypeORM
const database_1 = require("./config/database");
const userRoutes_1 = __importDefault(require("./routes/userRoutes")); // Import des routes utilisateurs
const tokenRoutes_1 = __importDefault(require("./routes/tokenRoutes")); // Import de la route pour générer les tokens
const productRoutes_1 = __importDefault(require("./routes/productRoutes")); // Import des routes produits
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
database_1.AppDataSource.initialize()
    .then(() => {
    console.log("Base de données connectée !");
})
    .catch((error) => console.error("Erreur de connexion à la base de données :", error));
// Création de l'application Express
const app = (0, express_1.default)();
// Middleware global pour interpréter le JSON dans les requêtes
app.use(express_1.default.json());
// Routes utilisateurs
app.use("/users", userRoutes_1.default);
// Routes produits
app.use("/products", productRoutes_1.default);
// Route pour générer les tokens JWT pour les tests
app.use("/tokens", tokenRoutes_1.default);
// Route protégée pour tester les middlewares `verifyToken` et `isAdmin`
app.get("/admin", middlewares_1.verifyToken, middlewares_1.isAdmin, (req, res) => {
    const user = req.user; // Accès à l'utilisateur authentifié
    res.send(`Bienvenue, admin ! Role: ${user === null || user === void 0 ? void 0 : user.role}`);
});
// Route simple pour tester l'application
app.get("/", (req, res) => {
    res.send("Bienvenue sur le backend e-commerce !");
});
// Middleware global pour gérer les erreurs
app.use(middlewares_1.errorHandler);
// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
//# sourceMappingURL=app.js.map