import { Router } from 'express';
import * as categoryController from '../controllers/category.controller';

const router = Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Récupérer la liste de toutes les catégories
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: Liste des catégories récupérée avec succès.
 */
router.get('/', categoryController.getAllCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Récupérer une catégorie par son identifiant
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de la catégorie
 *     responses:
 *       200:
 *         description: Catégorie récupérée avec succès.
 *       404:
 *         description: Catégorie non trouvée.
 */
router.get('/:id', categoryController.getCategoryById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Créer une nouvelle catégorie
 *     tags:
 *       - Categories
 *     requestBody:
 *       description: Données de la catégorie à créer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: "epices"
 *     responses:
 *       201:
 *         description: Catégorie créée avec succès.
 *       409:
 *         description: Conflit, la catégorie existe déjà.
 */
router.post('/', categoryController.createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Mettre à jour une catégorie existante
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de la catégorie à mettre à jour
 *     requestBody:
 *       description: Données à mettre à jour pour la catégorie
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: "herbes"
 *     responses:
 *       200:
 *         description: Catégorie mise à jour avec succès.
 *       404:
 *         description: Catégorie non trouvée.
 */
router.put('/:id', categoryController.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Supprimer une catégorie
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant de la catégorie à supprimer
 *     responses:
 *       200:
 *         description: Catégorie supprimée avec succès.
 *       404:
 *         description: Catégorie non trouvée.
 */
router.delete('/:id', categoryController.deleteCategory);

export default router;
