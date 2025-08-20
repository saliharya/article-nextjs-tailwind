import { Category } from "./category";
import { User } from "./User";

export interface Article {
    id: string;
    title: string;
    content: string;
    userId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
    category: Category;
    user: User;
}

export interface ArticleInput {
    title: string;
    content: string;
    categoryId: string;
}