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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const auth_1 = require("../utils/auth");
const router = express_1.default.Router();
// Route pour inscrire un utilisateur
router.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, UserController_1.registerUser)(req, res);
    }
    catch (error) {
        next(error);
    }
}));
// Route pour connecter un utilisateur
router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, UserController_1.loginUser)(req, res);
    }
    catch (error) {
        next(error);
    }
}));
// Route pour créer un administrateur (protégée)
router.post("/create-admin", auth_1.verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, UserController_1.createAdminUser)(req, res);
    }
    catch (error) {
        next(error);
    }
}));
// Route pour récupérer le profil d'un utilisateur (protégée)
router.get("/:id", auth_1.verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, UserController_1.getUserProfile)(req, res);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=userRoutes.js.map