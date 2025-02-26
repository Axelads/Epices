import { Router } from 'express';
import * as orderController from '../controllers/order.controller';
// Optionnel : importez un middleware d'authentification si nécessaire
// import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

// Optionnel : protéger toutes les routes avec authenticateJWT
// router.use(authenticateJWT);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Récupérer la liste de toutes les commandes
 *     responses:
 *       200:
 *         description: Liste des commandes récupérée avec succès.
 */
router.get('/', orderController.getAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Récupérer une commande par son identifiant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de la commande
 *     responses:
 *       200:
 *         description: Commande récupérée avec succès.
 *       404:
 *         description: Commande non trouvée.
 */
router.get('/:id', orderController.getOrderById);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Créer une nouvelle commande
 *     requestBody:
 *       description: Données de la commande à créer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *               status:
 *                 type: string
 *               total:
 *                 type: number
 *               reduction:
 *                 type: number
 *               shippingAddress:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *               notes:
 *                 type: string
 *             example:
 *               user_id: 1
 *               status: "pending"
 *               total: 100.50
 *               reduction: 10
 *               shippingAddress: "123 Rue de Paris, 75000 Paris"
 *               paymentMethod: "credit card"
 *               notes: "Livraison rapide souhaitée"
 *     responses:
 *       201:
 *         description: Commande créée avec succès.
 */
router.post('/', orderController.createOrder);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Mettre à jour une commande existante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de la commande à mettre à jour
 *     requestBody:
 *       description: Données à mettre à jour pour la commande
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *               status:
 *                 type: string
 *               total:
 *                 type: number
 *               reduction:
 *                 type: number
 *               shippingAddress:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *               notes:
 *                 type: string
 *             example:
 *               status: "paid"
 *               total: 90.50
 *     responses:
 *       200:
 *         description: Commande mise à jour avec succès.
 *       404:
 *         description: Commande non trouvée.
 */
router.put('/:id', orderController.updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Supprimer une commande
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de la commande à supprimer
 *     responses:
 *       200:
 *         description: Commande supprimée avec succès.
 *       404:
 *         description: Commande non trouvée.
 */
router.delete('/:id', orderController.deleteOrder);

export default router;
