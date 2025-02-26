import pool from '../config/db';
import { Order } from '../models/Order';

export const getAllOrders = async (): Promise<Order[]> => {
  const res = await pool.query('SELECT * FROM orders');
  return res.rows;
};

export const getOrderById = async (id: number): Promise<Order | null> => {
  const res = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
  return res.rows[0] || null;
};

export const createOrder = async (order: Partial<Order>): Promise<Order> => {
  const { user_id, status, total, reduction, shippingAddress, paymentMethod, notes } = order;
  // Ici, on n'insère pas les items dans la table orders (ils seront insérés dans une table order_items séparée)
  const res = await pool.query(
    `INSERT INTO orders ("user_id", "status", "total", "reduction", "shippingAddress", "paymentMethod", "notes")
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [user_id, status || 'pending', total, reduction, shippingAddress, paymentMethod, notes]
  );
  // Pour l'instant, items est vide. Vous pouvez le gérer séparément.
  return res.rows[0];
};

export const updateOrder = async (id: number, order: Partial<Order>): Promise<Order | null> => {
  const { user_id, status, total, reduction, shippingAddress, paymentMethod, notes } = order;
  const res = await pool.query(
    `UPDATE orders SET 
       "user_id" = COALESCE($1, "user_id"),
       "status" = COALESCE($2, "status"),
       "total" = COALESCE($3, "total"),
       "reduction" = COALESCE($4, "reduction"),
       "shippingAddress" = COALESCE($5, "shippingAddress"),
       "paymentMethod" = COALESCE($6, "paymentMethod"),
       "notes" = COALESCE($7, "notes")
     WHERE id = $8 RETURNING *`,
    [user_id, status, total, reduction, shippingAddress, paymentMethod, notes, id]
  );
  return res.rows[0] || null;
};

export const deleteOrder = async (id: number): Promise<boolean> => {
  const res = await pool.query('DELETE FROM orders WHERE id = $1', [id]);
  return (res.rowCount || 0) > 0;
};
