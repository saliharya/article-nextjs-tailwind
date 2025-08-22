import { apiClient } from "../client";
import { getArticlesParams } from "./request/getArticlesParams";
import { ArticleResponse } from "./response/articleListResponse";
import { ArticleDetailResponse } from "./response/articleResponse";

export const getArticles = async (
    params?: getArticlesParams): Promise<ArticleResponse> => {
    const response = await apiClient.get<ArticleResponse>("/articles", {
        params,
    })
    return response.data
}

export const getArticleDetail = async (id: string): Promise<ArticleDetailResponse> => {
    const response = await apiClient.get<ArticleDetailResponse>(`/articles/${id}`);
    return response.data;
}