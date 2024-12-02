"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware pour vérifier le token JWT
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token manquant, accès non autorisé." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret_key");
        // Attache les données décodées au `req.user`
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Token invalide, accès non autorisé." });
    }
};
exports.default = verifyToken;
//# sourceMappingURL=authMiddleware.js.map