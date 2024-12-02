import express from "express";
import { registerUser, loginUser, getUserProfile, createAdminUser } from "../controllers/UserController";
import { verifyToken } from "../utils/auth";

const router = express.Router();

// Route pour inscrire un utilisateur
router.post("/register", async (req, res, next) => {
  try {
    await registerUser(req, res);
  } catch (error) {
    next(error);
  }
});

// Route pour connecter un utilisateur
router.post("/login", async (req, res, next) => {
  try {
    await loginUser(req, res);
  } catch (error) {
    next(error);
  }
});

// Route pour créer un administrateur (protégée)
router.post("/create-admin", verifyToken, async (req, res, next) => {
  try {
    await createAdminUser(req, res);
  } catch (error) {
    next(error);
  }
});

// Route pour récupérer le profil d'un utilisateur (protégée)
router.get("/:id", verifyToken, async (req, res, next) => {
  try {
    await getUserProfile(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
