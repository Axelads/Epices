import jwt from 'jsonwebtoken';
import { User } from '../models/User';

// Utilise une variable d'environnement pour la clé secrète
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Génère un token pour l'utilisateur
export const generateToken = (user: any): string => {
  // Prépare le payload ; tu peux y inclure ce que tu souhaites (id, email, name, etc.)
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };

  // Le token expire par exemple dans 1 heure
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

// Optionnel : fonction pour comparer un mot de passe en clair avec son hash
import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
