export interface Category {
    id: string;
    name: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface CategoryInput {
    name: string;
}