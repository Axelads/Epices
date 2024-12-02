"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Middleware pour vérifier si l'utilisateur est un administrateur
const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Accès refusé : droits administrateurs requis." });
    }
    next(); // Passe au middleware suivant si l'utilisateur est admin
};
exports.default = isAdmin;
//# sourceMappingURL=adminMiddleware.js.map