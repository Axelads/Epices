import pool from '../config/db';
import { Product } from '../models/Product';

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await pool.query('SELECT * FROM products');
  return res.rows;
};

export const getProductById = async (id: number): Promise<Product | null> => {
  const res = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  return res.rows[0] || null;
};

export const createProduct = async (product: Partial<Product>): Promise<Product> => {
  const { name, description, price, stock, category, imgUrl } = product;
  const res = await pool.query(
    `INSERT INTO products ("name", "description", "price", "stock", "category", "imgUrl")
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [name, description, price, stock, category, imgUrl]
  );
  return res.rows[0];
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product | null> => {
  const { name, description, price, stock, category, imgUrl } = product;
  const res = await pool.query(
    `UPDATE products SET 
       "name" = COALESCE($1, "name"),
       "description" = COALESCE($2, "description"),
       "price" = COALESCE($3, "price"),
       "stock" = COALESCE($4, "stock"),
       "category" = COALESCE($5, "category"),
       "imgUrl" = COALESCE($6, "imgUrl")
     WHERE id = $7 RETURNING *`,
    [name, description, price, stock, category, imgUrl, id]
  );
  return res.rows[0] || null;
};

export const deleteProduct = async (id: number): Promise<boolean> => {
  const res = await pool.query('DELETE FROM products WHERE id = $1', [id]);
  return (res.rowCount || 0) > 0;
};
