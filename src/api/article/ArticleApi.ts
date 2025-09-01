import { Category } from "@/models/category"
import { apiClient } from "../client"
import { getArticlesParams } from "./request/getArticlesParams"
import { ArticleResponse } from "./response/articleListResponse"
import { ArticleDetailResponse } from "./response/articleResponse"
import { CategoryResponse } from "./response/categoryResponse"

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

export const updateArticle = async (
    id: string,
    data: { title: string; content: string; categoryId: string }
): Promise<ArticleDetailResponse> => {
    const response = await apiClient.put<ArticleDetailResponse>(`/articles/${id}`, data)
    return response.data
}

export const deleteArticle = async (id: string): Promise<void> => {
    await apiClient.delete(`/articles/${id}`)
}

export const getCategories = async (
    params?: { page?: number; limit?: number; search?: string }
): Promise<CategoryResponse> => {
    const response = await apiClient.get<CategoryResponse>("/categories", { params })
    return response.data
}

export const createCategory = async (
    data: { name: string }
): Promise<Category> => {
    const response = await apiClient.post<Category>("/categories", data)
    return response.data
}

export const updateCategory = async (
    id: string,
    data: { name: string }
): Promise<Category> => {
    const response = await apiClient.put<Category>(`/categories/${id}`, data)
    return response.data
}

export const deleteCategory = async (id: string): Promise<void> => {
    await apiClient.delete(`/categories/${id}`)
}