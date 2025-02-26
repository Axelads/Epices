import { Router } from 'express';
import { createStripePaymentIntent } from '../controllers/payment.stripe.controller';
import { createPaypalOrder, capturePaypalOrder } from '../controllers/payment.paypal.controller';

const router = Router();

/**
 * @swagger
 * /payments/stripe/create-intent:
 *   post:
 *     summary: Créer un Payment Intent avec Stripe
 *     description: Crée un Payment Intent en spécifiant le montant (en centimes) et la devise. Le client recevra le client secret nécessaire pour finaliser le paiement côté frontend.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Montant en centimes.
 *               currency:
 *                 type: string
 *                 description: Code de devise, par ex. "usd".
 *             example:
 *               amount: 5000
 *               currency: "usd"
 *     responses:
 *       201:
 *         description: Payment Intent créé avec succès.
 */
router.post('/stripe/create-intent', createStripePaymentIntent);

/**
 * @swagger
 * /payments/paypal/create-order:
 *   post:
 *     summary: Créer une commande PayPal
 *     description: Crée une commande PayPal en spécifiant le montant et la devise. La réponse contient les détails de la commande, incluant l'ID de la commande.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: string
 *                 description: Montant de la commande sous forme de chaîne, par exemple "50.00".
 *               currency:
 *                 type: string
 *                 description: Code de devise, par ex. "USD".
 *             example:
 *               amount: "50.00"
 *               currency: "USD"
 *     responses:
 *       201:
 *         description: Commande PayPal créée avec succès.
 */
router.post('/paypal/create-order', createPaypalOrder);

/**
 * @swagger
 * /payments/paypal/capture/{orderId}:
 *   post:
 *     summary: Capturer une commande PayPal
 *     description: Capture une commande PayPal en utilisant l'ID de la commande.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: L'identifiant de la commande PayPal à capturer.
 *     responses:
 *       200:
 *         description: Commande PayPal capturée avec succès.
 */
router.post('/paypal/capture/:orderId', capturePaypalOrder);

export default router;
