export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imgUrl?: string; // URL de l'image, optionnel
    img?: Buffer;
    created_at: Date;
  }
  