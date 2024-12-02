"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TokenController_1 = require("../controllers/TokenController");
const router = express_1.default.Router();
// Route GET pour générer un token JWT
router.get("/generate-token", TokenController_1.generateTokenWithQuery);
// Route POST pour générer un token JWT
router.post("/generate-token", TokenController_1.generateTokenWithBody);
exports.default = router;
//# sourceMappingURL=tokenRoutes.js.map