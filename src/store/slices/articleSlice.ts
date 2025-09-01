import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { getArticlesParams } from "@/api/article/request/getArticlesParams"
import { getArticleDetail, getArticles } from "@/api/article/ArticleApi"
import { ArticleDetailResponse } from "@/api/article/response/articleResponse"
import { ArticleResponse } from "@/api/article/response/articleListResponse"
import { ArticleSliceState } from "../../states/articles/articleSliceState"
import {
    createArticle as createArticleApi,
    updateArticle as updateArticleApi,
} from "@/api/article/ArticleApi"

export const fetchArticles = createAsyncThunk<
    ArticleResponse,
    getArticlesParams | undefined,
    { rejectValue: string }
>("articles/fetchArticles", async (params, { rejectWithValue }) => {
    try {
        const response = await getArticles(params)
        return response
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to fetch articles")
    }
})

export const fetchArticleById = createAsyncThunk<
    ArticleDetailResponse,
    string,
    { rejectValue: string }
>("articles/fetchArticleById", async (id, { rejectWithValue }) => {
    try {
        const article = await getArticleDetail(id)
        return article
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Article not found")
    }
})

export const createArticleThunk = createAsyncThunk<
    ArticleDetailResponse,
    { title: string; content: string; categoryId: string },
    { rejectValue: string }
>("articles/createArticle", async (data, { rejectWithValue }) => {
    try {
        const newArticle = await createArticleApi(data)
        return newArticle
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to create article")
    }
})

export const updateArticleThunk = createAsyncThunk<
    ArticleDetailResponse,
    { id: string; title: string; content: string; categoryId: string },
    { rejectValue: string }
>("articles/updateArticle", async ({ id, ...data }, { rejectWithValue }) => {
    try {
        const updated = await updateArticleApi(id, data)
        return updated
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to update article")
    }
})

const initialState: ArticleSliceState = {
    list: {
        items: [],
        total: 0,
        page: 1,
        limit: 10,
        loading: false,
        error: null,
        selectedCategory: null,
        searchTerm: "",
        showCreate: false,
        formMode: null,
    },
    detail: {
        article: undefined,
        loading: false,
        error: null
    }
}

const articleSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.list.page = action.payload
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.list.limit = action.payload
        },
        setCategory: (state, action: PayloadAction<string | null>) => {
            state.list.selectedCategory = action.payload
            state.list.page = 1
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.list.searchTerm = action.payload
            state.list.page = 1
        },
        clearSelectedArticle: (state) => {
            state.detail.article = undefined
            state.detail.error = null
            state.detail.loading = false
        },
        setShowCreate: (state, action: PayloadAction<boolean>) => {
            state.list.showCreate = action.payload
        },
        setFormMode: (state, action: PayloadAction<"create" | "edit" | null>) => {
            state.list.formMode = action.payload
        },
        closeForm: (state) => {
            state.list.showCreate = false
            state.list.formMode = null
            state.detail.article = undefined
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.list.loading = true
                state.list.error = null
            })
            .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<ArticleResponse>) => {
                state.list.loading = false
                state.list.items = action.payload.data
                state.list.total = action.payload.total
                state.list.page = action.payload.page
                state.list.limit = action.payload.limit
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.list.loading = false
                state.list.error = action.payload || "Failed to fetch articles"
            })

        builder
            .addCase(fetchArticleById.pending, (state) => {
                state.detail.loading = true
                state.detail.error = null
            })
            .addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<ArticleDetailResponse>) => {
                state.detail.loading = false
                state.detail.article = action.payload
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.detail.loading = false
                state.detail.error = action.payload || "Failed to fetch article detail"
            })
    }
})

export const {
    setPage,
    setLimit,
    setCategory,
    setSearchTerm,
    clearSelectedArticle,
    setShowCreate,
    setFormMode,
    closeForm,
} = articleSlice.actions
export default articleSlice.reducer
