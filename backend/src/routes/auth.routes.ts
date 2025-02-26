import { Router } from 'express';
import { 
  googleAuthRedirect, 
  googleAuthCallback, 
  localRegister, 
  localLogin 
} from '../controllers/auth.controller';

const router = Router();

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Rediriger vers Google pour l'authentification
 *     tags:
 *       - Auth
 *     responses:
 *       302:
 *         description: Redirection vers la page de connexion Google.
 */
router.get('/google', googleAuthRedirect);

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Callback après authentification Google
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Authentification réussie, renvoie un token JWT et les informations de l'utilisateur.
 *       400:
 *         description: Échec de l'authentification.
 */
router.get('/google/callback', googleAuthCallback);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscription locale d'un utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Données d'inscription de l'utilisateur.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               address:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               password:
 *                 type: string
 *             example:
 *               title: "monsieur"
 *               firstName: "Jean"
 *               lastName: "Dupont"
 *               address: "123 Rue de Paris, 75000 Paris"
 *               email: "jean.dupont@example.com"
 *               phoneNumber: "0123456789"
 *               dateOfBirth: "1980-05-15"
 *               password: "monMotDePasseSecret"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès, renvoie un token JWT.
 *       409:
 *         description: Conflit, l'utilisateur existe déjà.
 */
router.post('/register', localRegister);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion locale d'un utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Données de connexion de l'utilisateur.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "jean.dupont@example.com"
 *               password: "monMotDePasseSecret"
 *     responses:
 *       200:
 *         description: Connexion réussie, renvoie un token JWT et les informations de l'utilisateur.
 *       401:
 *         description: Identifiants invalides.
 */
router.post('/login', localLogin);

export default router;
