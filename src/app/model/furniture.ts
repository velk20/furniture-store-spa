export interface CreateFurniture {
  name: string;
  description: string;
  userId: number;
  imageUrls: string[];
  isActive: boolean;
  isOnSale: boolean;
  price: number;
  stock: number;
}

export interface Furniture extends CreateFurniture{
  id: number;
}
