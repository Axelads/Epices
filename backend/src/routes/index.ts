import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import productRoutes from './product.routes';
import orderRoutes from './order.routes';
import categoryRoutes from './category.routes';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Routes d'authentification (login, register, etc.)
 *   - name: Users
 *     description: Gestion des utilisateurs
 *   - name: Products
 *     description: Gestion des produits
 *   - name: Orders
 *     description: Gestion des commandes
 *   - name: Categories
 *     description: Gestion des catégories de produits
 */

/**
 * @swagger
 * /auth:
 *   description: Routes pour l'authentification.
 */
router.use('/auth', authRoutes);

/**
 * @swagger
 * /users:
 *   description: Routes pour la gestion des utilisateurs.
 */
router.use('/users', userRoutes);

/**
 * @swagger
 * /products:
 *   description: Routes pour la gestion des produits.
 */
router.use('/products', productRoutes);

/**
 * @swagger
 * /orders:
 *   description: Routes pour la gestion des commandes.
 */
router.use('/orders', orderRoutes);

/**
 * @swagger
 * /categories:
 *   description: Routes pour la gestion des catégories.
 */
router.use('/categories', categoryRoutes);

export default router;
