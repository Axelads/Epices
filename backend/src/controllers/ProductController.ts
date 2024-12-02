import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Product } from "../entities/Product";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, imageURL, weight } = req.body;

    // Validation des données reçues
    if (!name || !description || !price || !stock) {
      return res.status(400).json({ message: "Tous les champs requis doivent être renseignés." });
    }

    // Création du produit
    const productRepository = AppDataSource.getRepository(Product);
    const product = productRepository.create({
      name,
      description,
      price,
      stock,
      imageURL,
      weight, // Assurez-vous de passer toutes les propriétés nécessaires.
    });

    // Sauvegarde dans la base de données
    await productRepository.save(product);

    return res.status(201).json({ message: "Produit ajouté avec succès.", product });
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit :", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
