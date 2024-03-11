export interface CreateCategory {
  name: string;
  description: string;
}

export interface Category extends CreateCategory {
  id: number;
}
