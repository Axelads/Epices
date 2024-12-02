import express from "express";
import { generateTokenWithQuery, generateTokenWithBody } from "../controllers/TokenController";

const router = express.Router();

// Route GET pour générer un token JWT
router.get("/generate-token", generateTokenWithQuery);

// Route POST pour générer un token JWT
router.post("/generate-token", generateTokenWithBody);

export default router;
