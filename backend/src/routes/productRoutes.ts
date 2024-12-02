import express from "express";
import { verifyToken, isAdmin } from "../middlewares";
import { addProduct } from "../controllers/ProductController";

const router = express.Router();

// Route pour ajouter un produit (protégée)
router.post("/add", verifyToken, isAdmin, addProduct);

export default router;
