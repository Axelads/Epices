"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.createAdminUser = exports.loginUser = exports.registerUser = void 0;
const User_1 = require("../entities/User");
const database_1 = require("../config/database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Inscription d'un utilisateur
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = req.body; // Ajout du champ role
    if (!email || !password || !role) {
        return res.status(400).json({ message: "Email, mot de passe et rôle requis." });
    }
    if (!["user", "admin"].includes(role)) {
        return res.status(400).json({ message: "Le rôle doit être 'user' ou 'admin'." });
    }
    try {
        const userRepository = database_1.AppDataSource.getRepository(User_1.User);
        // Vérifier si l'utilisateur existe déjà
        const existingUser = yield userRepository.findOneBy({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Utilisateur déjà enregistré." });
        }
        // Hacher le mot de passe
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Créer un nouvel utilisateur
        const user = userRepository.create({
            email,
            password: hashedPassword,
            role, // Ajout du rôle ici
        });
        yield userRepository.save(user);
        return res.status(201).json({ message: "Utilisateur enregistré avec succès." });
    }
    catch (error) {
        return res.status(500).json({ message: "Erreur serveur.", error });
    }
});
exports.registerUser = registerUser;
// Connexion d'un utilisateur
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email et mot de passe requis." });
    }
    try {
        const userRepository = database_1.AppDataSource.getRepository(User_1.User);
        // Vérifier si l'utilisateur existe
        const user = yield userRepository.findOneBy({ email });
        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvé." });
        }
        // Vérifier le mot de passe
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Mot de passe incorrect." });
        }
        // Générer un token JWT avec le rôle
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "secret", {
            expiresIn: "1h",
        });
        return res.status(200).json({ token });
    }
    catch (error) {
        return res.status(500).json({ message: "Erreur serveur.", error });
    }
});
exports.loginUser = loginUser;
// Création d'un utilisateur administrateur
const createAdminUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email et mot de passe requis." });
    }
    try {
        const userRepository = database_1.AppDataSource.getRepository(User_1.User);
        // Vérifier si l'utilisateur existe déjà
        const existingUser = yield userRepository.findOneBy({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Cet utilisateur existe déjà." });
        }
        // Hacher le mot de passe
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Créer un nouvel utilisateur avec le rôle "admin"
        const adminUser = userRepository.create({
            email,
            password: hashedPassword,
            role: "admin",
        });
        yield userRepository.save(adminUser);
        return res.status(201).json({
            message: "Administrateur créé avec succès.",
            admin: { id: adminUser.id, email: adminUser.email, role: adminUser.role },
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Erreur serveur.", error });
    }
});
exports.createAdminUser = createAdminUser;
// Récupérer le profil d'un utilisateur
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    try {
        const userRepository = database_1.AppDataSource.getRepository(User_1.User);
        const user = yield userRepository.findOneBy({ id: userId });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
        // Masquer le mot de passe dans la réponse
        const { password } = user, userWithoutPassword = __rest(user, ["password"]);
        return res.status(200).json(userWithoutPassword);
    }
    catch (error) {
        return res.status(500).json({ message: "Erreur serveur.", error });
    }
});
exports.getUserProfile = getUserProfile;
//# sourceMappingURL=UserController.js.map