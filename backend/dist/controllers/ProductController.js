"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = void 0;
const database_1 = require("../config/database");
const Product_1 = require("../entities/Product");
// Contrôleur pour ajouter un produit
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, stock, weight, origin, availability, imageURL } = req.body;
        // Validation des données reçues
        if (!name || !description || !price || !stock) {
            return res.status(400).json({ message: "Tous les champs requis doivent être renseignés." });
        }
        // Création du produit
        const productRepository = database_1.AppDataSource.getRepository(Product_1.Product);
        const product = productRepository.create({
            name,
            description,
            price,
            stock,
            weight,
            origin,
            availability: availability !== undefined ? availability : true, // Par défaut : disponible
            imageURL,
        });
        // Sauvegarde dans la base de données
        yield productRepository.save(product);
        return res.status(201).json({ message: "Produit ajouté avec succès.", product });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Erreur lors de l'ajout du produit :", error.message);
            return res.status(500).json({ message: "Erreur interne du serveur", error: error.message });
        }
        else {
            console.error("Erreur inconnue :", error);
            return res.status(500).json({ message: "Erreur interne du serveur", error: "Erreur inconnue" });
        }
    }
});
exports.addProduct = addProduct;
//# sourceMappingURL=ProductController.js.map