import {User} from "./user";

export interface CreateFurniture {
  title: string;
  description: string;
  userId: number;
  imageUrl: string;
  isActive: boolean;
  price: number;
  quantity: number;
}

export interface Furniture extends CreateFurniture{
  id: number;
}
