export interface CreateFurniture {
  title: string;
  description: string;
  userId: number;
  imageUrl: string;
  isActive: boolean;
  price: number;
  quantity: number;
  categoryId: number;
}

export interface Furniture extends CreateFurniture {
  id: number;
}
