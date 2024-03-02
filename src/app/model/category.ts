export interface CreateCategory {
    name: string;
    description: string;
    imageUrl: string;
}

export interface Category extends CreateCategory{
    id: number;
}
