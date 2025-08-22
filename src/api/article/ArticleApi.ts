import { apiClient } from "../client";
import { getArticlesParams } from "./request/getArticlesParams";
import { ArticleResponse } from "./response/articleListResponse";

export const getArticles = async (
    params?: getArticlesParams): Promise<ArticleResponse> => {
    const response = await apiClient.get<ArticleResponse>("/articles", {
        params,
    })
    return response.data
}