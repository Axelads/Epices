import pool from '../config/db';
import { User } from '../models/User';

/**
 * Récupère la liste de tous les utilisateurs.
 */
export const getAllUsers = async (): Promise<User[]> => {
  const res = await pool.query('SELECT * FROM users');
  return res.rows;
};

/**
 * Récupère un utilisateur par son identifiant.
 */
export const getUserById = async (id: number): Promise<User | null> => {
  const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return res.rows[0] || null;
};

/**
 * Récupère un utilisateur par son email.
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0] || null;
};

/**
 * Crée un nouvel utilisateur.
 */
export const createUser = async (user: Partial<User>): Promise<User> => {
  const { title, firstName, lastName, address, email, phoneNumber, dateOfBirth, password, googleId } = user;
  const res = await pool.query(
    `INSERT INTO users ("title", "firstName", "lastName", "address", "email", "phoneNumber", "dateOfBirth", "password", "google_id")
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [title, firstName, lastName, address, email, phoneNumber, dateOfBirth, password, googleId]
  );
  return res.rows[0];
};

/**
 * Met à jour un utilisateur existant.
 */
export const updateUser = async (id: number, user: Partial<User>): Promise<User | null> => {
  const { title, firstName, lastName, address, email, phoneNumber, dateOfBirth, password, googleId } = user;
  const res = await pool.query(
    `UPDATE users SET 
       "title" = COALESCE($1, "title"),
       "firstName" = COALESCE($2, "firstName"),
       "lastName" = COALESCE($3, "lastName"),
       "address" = COALESCE($4, "address"),
       "email" = COALESCE($5, "email"),
       "phoneNumber" = COALESCE($6, "phoneNumber"),
       "dateOfBirth" = COALESCE($7, "dateOfBirth"),
       "password" = COALESCE($8, "password"),
       "google_id" = COALESCE($9, "google_id")
     WHERE id = $10 RETURNING *`,
    [title, firstName, lastName, address, email, phoneNumber, dateOfBirth, password, googleId, id]
  );
  return res.rows[0] || null;
};

/**
 * Supprime un utilisateur.
 */
export const deleteUser = async (id: number): Promise<boolean> => {
  const res = await pool.query('DELETE FROM users WHERE id = $1', [id]);
  return (res.rowCount || 0) > 0;
};
