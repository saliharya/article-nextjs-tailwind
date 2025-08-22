import { Article } from "@/models/article";

export interface ArticleResponse {
    data: Article[];
    total: number;
    page: number;
    limit: number;
}