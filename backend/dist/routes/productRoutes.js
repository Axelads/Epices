"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const ProductController_1 = require("../controllers/ProductController");
const router = express_1.default.Router();
// Route pour ajouter un produit (protégée)
router.post("/add", middlewares_1.verifyToken, middlewares_1.isAdmin, ProductController_1.addProduct);
exports.default = router;
//# sourceMappingURL=productRoutes.js.map