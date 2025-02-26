export interface User {
    id: number;
    title: string;         // "monsieur" ou "madame"
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    phoneNumber?: string;  // facultatif
    dateOfBirth: Date;
    password?: string;     // pour l'authentification locale, haché
    googleId?: string;     // pour OAuth via Google
    role?: string; // Ajout du rôle, par défaut "utilisateur"
    created_at?: Date;
  }
  