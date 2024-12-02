"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenWithBody = exports.generateTokenWithQuery = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Fonction pour gérer la génération du token avec la méthode GET
const generateTokenWithQuery = (req, res) => {
    const { role } = req.query; // Extrait le rôle depuis la requête
    if (!role) {
        return res.status(400).json({ message: "Le rôle est requis dans la requête." });
    }
    const token = jsonwebtoken_1.default.sign({ id: 1, role }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token valide pour 1 heure
    });
    res.json({ token });
};
exports.generateTokenWithQuery = generateTokenWithQuery;
// Fonction pour gérer la génération du token avec la méthode POST
const generateTokenWithBody = (req, res) => {
    const { role, id } = req.body; // Extrait le rôle et l'ID depuis le corps de la requête
    if (!role || !id) {
        return res.status(400).json({ message: "Le rôle et l'ID sont requis dans le corps de la requête." });
    }
    const token = jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token valide pour 1 heure
    });
    res.json({ token });
};
exports.generateTokenWithBody = generateTokenWithBody;
//# sourceMappingURL=TokenController.js.map