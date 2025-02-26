import { Request, Response, NextFunction } from 'express';
import * as paypalService from '../services/payment.paypal.service';

export const createPaypalOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Par exemple, attendez-vous à recevoir "amount" et "currency" dans le body
    const { amount, currency } = req.body;
    const order = await paypalService.createOrder(amount, currency);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const capturePaypalOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { orderId } = req.params;
    const capture = await paypalService.captureOrder(orderId);
    res.status(200).json(capture);
  } catch (error) {
    next(error);
  }
};
