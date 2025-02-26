import { OrderItem } from './OrderItem';

export interface Order {
  id: number;                          // Identifiant unique de la commande
  user_id: number;                     // Référence à l'utilisateur qui passe la commande (clé étrangère vers Users)
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';  // Statut de la commande
  total: number;                       // Montant total de la commande
  reduction?: number;                  // Réduction appliquée, le cas échéant
  shippingAddress: string;             // Adresse de livraison de la commande
  paymentMethod: string;               // Mode de paiement utilisé (ex. "paypal", "credit card")
  notes?: string;                      // Commentaires ou instructions spéciales
  items: OrderItem[];                  // Liste des articles commandés
  created_at: Date;                    // Date de création de la commande
  updated_at?: Date;                   // Date de dernière mise à jour (optionnel)
}
