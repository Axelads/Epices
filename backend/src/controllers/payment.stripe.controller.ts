import { Request, Response, NextFunction } from 'express';
import * as stripeService from '../services/payment.stripe.service';

export const createStripePaymentIntent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { amount, currency } = req.body; // amount en centimes, currency ex: 'usd'
    const paymentIntent = await stripeService.createPaymentIntent(amount, currency);
    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    next(error);
  }
};
