export interface getArticlesParams {
    articleId?: string;
    userId?: string;
    title?: string;
    category?: string;
    createdAtStart?: string;
    createdAtEnd?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}
