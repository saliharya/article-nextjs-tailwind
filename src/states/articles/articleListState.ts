import { ArticleResponse } from "@/api/article/response/articleListResponse"

export interface ArticleListState {
    items: ArticleResponse["data"]
    total: number
    page: number
    limit: number
    loading: boolean
    error: string | null
    selectedCategory: string | null
    searchTerm: string
}