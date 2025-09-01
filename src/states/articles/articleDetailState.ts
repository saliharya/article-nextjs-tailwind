import { ArticleDetailResponse } from "@/api/article/response/articleResponse"

export interface ArticleDetailState {
    article?: ArticleDetailResponse
    loading: boolean
    error: string | null
}