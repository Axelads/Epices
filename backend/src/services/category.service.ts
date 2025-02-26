import pool from '../config/db';
import { Category } from '../models/Category';

export const getAllCategories = async (): Promise<Category[]> => {
  const res = await pool.query('SELECT * FROM categories');
  return res.rows;
};

export const getCategoryById = async (id: number): Promise<Category | null> => {
  const res = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
  return res.rows[0] || null;
};

export const createCategory = async (category: Partial<Category>): Promise<Category> => {
  const { name } = category;
  const res = await pool.query(
    `INSERT INTO categories ("name") VALUES ($1) RETURNING *`,
    [name]
  );
  return res.rows[0];
};

export const updateCategory = async (id: number, category: Partial<Category>): Promise<Category | null> => {
  const { name } = category;
  const res = await pool.query(
    `UPDATE categories SET "name" = COALESCE($1, "name") WHERE id = $2 RETURNING *`,
    [name, id]
  );
  return res.rows[0] || null;
};

export const deleteCategory = async (id: number): Promise<boolean> => {
  const res = await pool.query('DELETE FROM categories WHERE id = $1', [id]);
  return (res.rowCount || 0) > 0;
};
