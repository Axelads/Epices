import { Request, Response } from "express";
import { User } from "../entities/User";
import { AppDataSource } from "../config/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Inscription d'un utilisateur
export const registerUser = async (req: Request, res: Response) => {
  const { email, password, role } = req.body; // Ajout du champ role

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Email, mot de passe et rôle requis." });
  }

  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({ message: "Le rôle doit être 'user' ou 'admin'." });
  }

  try {
    const userRepository = AppDataSource.getRepository(User);

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Utilisateur déjà enregistré." });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const user = userRepository.create({
      email,
      password: hashedPassword,
      role, // Ajout du rôle ici
    });
    await userRepository.save(user);

    return res.status(201).json({ message: "Utilisateur enregistré avec succès." });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur.", error });
  }
};


// Connexion d'un utilisateur
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis." });
  }

  try {
    const userRepository = AppDataSource.getRepository(User);

    // Vérifier si l'utilisateur existe
    const user = await userRepository.findOneBy({ email });
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé." });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    // Générer un token JWT avec le rôle
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur.", error });
  }
};

// Création d'un utilisateur administrateur
export const createAdminUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis." });
  }

  try {
    const userRepository = AppDataSource.getRepository(User);

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet utilisateur existe déjà." });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur avec le rôle "admin"
    const adminUser = userRepository.create({
      email,
      password: hashedPassword,
      role: "admin",
    });
    await userRepository.save(adminUser);

    return res.status(201).json({
      message: "Administrateur créé avec succès.",
      admin: { id: adminUser.id, email: adminUser.email, role: adminUser.role },
    });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur.", error });
  }
};

// Récupérer le profil d'un utilisateur
export const getUserProfile = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  try {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Masquer le mot de passe dans la réponse
    const { password, ...userWithoutPassword } = user;

    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur.", error });
  }
};
