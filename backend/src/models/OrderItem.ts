export interface OrderItem {
    id: number;
    order_id: number;   // Référence à la commande (clé étrangère vers Order)
    product_id: number; // Référence au produit (clé étrangère vers Product)
    quantity: number;   // Quantité commandée
    price: number;      // Prix unitaire au moment de l'achat
  }
  