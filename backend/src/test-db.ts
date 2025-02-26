import dotenv from 'dotenv';
dotenv.config();

import pool from './config/db';

(async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Connexion réussie ! Heure actuelle :', result.rows[0].now);
    process.exit(0);
  } catch (error) {
    console.error('Erreur de connexion :', error);
    process.exit(1);
  }
})();
