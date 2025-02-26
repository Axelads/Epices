import { Request, Response, NextFunction } from 'express';
import * as orderService from '../services/order.service';

export const getAllOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const order = await orderService.getOrderById(id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { user_id, status, total, reduction, shippingAddress, paymentMethod, notes } = req.body;
    const newOrder = await orderService.createOrder({
      user_id,
      status,
      total,
      reduction,
      shippingAddress,
      paymentMethod,
      notes,
      items: [] // Par défaut, la commande démarre avec aucun item
    });
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const { user_id, status, total, reduction, shippingAddress, paymentMethod, notes } = req.body;
    const updatedOrder = await orderService.updateOrder(id, { user_id, status, total, reduction, shippingAddress, paymentMethod, notes });
    if (!updatedOrder) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleted = await orderService.deleteOrder(id);
    if (!deleted) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    next(error);
  }
};
