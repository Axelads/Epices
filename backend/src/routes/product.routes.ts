import { Router } from 'express';
import { upload } from '../config/multer';
import * as productController from '../controllers/product.controller';

const router = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Récupérer la liste de tous les produits
 *     responses:
 *       200:
 *         description: Liste de produits récupérée avec succès.
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Récupérer un produit par son identifiant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant du produit
 *     responses:
 *       200:
 *         description: Produit récupéré avec succès.
 *       404:
 *         description: Produit non trouvé.
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Créer un produit avec upload d'image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *             example:
 *               name: "Paprika"
 *               description: "Paprika de haute qualité"
 *               price: 4.99
 *               stock: 100
 *               category: "epices"
 *     responses:
 *       201:
 *         description: Produit créé avec succès.
 */
router.post('/', upload.single('image'), productController.createProductWithImage);

/**
 * @swagger
 * /products/create:
 *   post:
 *     summary: Créer un produit sans image
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               category:
 *                 type: string
 *             example:
 *               name: "Paprika"
 *               description: "Paprika de haute qualité"
 *               price: 4.99
 *               stock: 100
 *               category: "epices"
 *     responses:
 *       201:
 *         description: Produit créé avec succès.
 */
router.post('/create', productController.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Mettre à jour un produit existant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant du produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               category:
 *                 type: string
 *             example:
 *               name: "Paprika"
 *               description: "Paprika premium"
 *               price: 5.99
 *               stock: 120
 *               category: "epices"
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès.
 *       404:
 *         description: Produit non trouvé.
 */
router.put('/:id', productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Supprimer un produit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'identifiant du produit à supprimer
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès.
 *       404:
 *         description: Produit non trouvé.
 */
router.delete('/:id', productController.deleteProduct);

export default router;
