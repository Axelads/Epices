import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import * as authService from '../services/auth.service';
import * as userService from '../services/user.service';

// -----------------------------
// Authentification via Google
// -----------------------------

// Redirige vers Google pour l'authentification
export const googleAuthRedirect = passport.authenticate('google', { scope: ['profile', 'email'] });

// Callback après authentification Google
export const googleAuthCallback = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('google', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something went wrong during authentication',
        error: err,
      });
    }
    // Génère et renvoie un token JWT
    const token = authService.generateToken(user);
    return res.json({ token, user });
  })(req, res, next);
};

// -----------------------------
// Authentification locale
// -----------------------------

/**
 * Inscription locale : l'utilisateur fournit ses informations (civilité, prénom, nom, adresse, email, téléphone, date de naissance, mot de passe)
 * Le rôle est forcé à "utilisateur", afin qu'il ne puisse pas s'enregistrer en tant qu'admin.
 */
export const localRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, firstName, lastName, address, email, phoneNumber, dateOfBirth, password } = req.body;

    // Vérifie si un utilisateur avec cet email existe déjà
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }

    // Hache le mot de passe
    const hashedPassword = await authService.hashPassword(password);

    // Crée l'utilisateur en forçant le rôle à "utilisateur"
    const newUser = await userService.createUser({
      title,
      firstName,
      lastName,
      address,
      email,
      phoneNumber,
      dateOfBirth,
      password: hashedPassword,
      role: 'utilisateur'
    });

    // Génère un token JWT pour le nouvel utilisateur
    const token = authService.generateToken(newUser);
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    next(error);
  }
};

/**
 * Connexion locale : l'utilisateur se connecte avec son email et son mot de passe
 */
export const localLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Recherche l'utilisateur par email
    const user = await userService.getUserByEmail(email);
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Vérifie que le mot de passe correspond
    const isValid = await authService.comparePassword(password, user.password as string);
    if (!isValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Génère un token JWT
    const token = authService.generateToken(user);
    res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};
