import { Request, Response, NextFunction } from 'express';
import * as productService from '../services/product.service';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

/**
 * Crée un nouveau produit avec image uploadée et traitée.
 * L'image est redimensionnée pour ne pas dépasser 1024x1024 et convertie en .webp.
 */
export const createProductWithImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description, price, stock, category } = req.body;
    let imgUrl = '';

    if (req.file) {
      // Traite l'image avec Sharp pour redimensionner et convertir en .webp
      const processedImageBuffer = await sharp(req.file.buffer)
        .resize({ width: 1024, height: 1024, fit: 'inside' })
        .toFormat('webp')
        .toBuffer();

      // Génère un nom de fichier unique pour l'image
      const fileName = 'image-' + Date.now() + '.webp';
      const uploadDir = path.join(__dirname, '../../uploads');

      // Crée le dossier uploads s'il n'existe pas
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, processedImageBuffer);

      // Construit l'URL relative de l'image (à adapter selon la configuration de votre serveur statique)
      imgUrl = `/uploads/${fileName}`;
    }

    const productData = {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      category, // La catégorie du produit
      imgUrl,   // URL de l'image traitée
    };

    const newProduct = await productService.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

// Les autres fonctions du contrôleur (getAllProducts, getProductById, createProduct, updateProduct, deleteProduct) restent inchangées.
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const product = await productService.getProductById(id);
    if (!product) {
      res.status(404).json({ message: 'Produit non trouvé' });
      return;
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const productData = req.body;
    const newProduct = await productService.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const productData = req.body;
    const updatedProduct = await productService.updateProduct(id, productData);
    if (!updatedProduct) {
      res.status(404).json({ message: 'Produit non trouvé' });
      return;
    }
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleted = await productService.deleteProduct(id);
    if (!deleted) {
      res.status(404).json({ message: 'Produit non trouvé' });
      return;
    }
    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    next(error);
  }
};
