import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { ArticleResponse } from "@/api/article/response/articleListResponse"
import { getArticlesParams } from "@/api/article/request/getArticlesParams"
import { getArticles } from "@/api/article/ArticleApi"

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

interface ArticleState {
    items: ArticleResponse["data"]
    total: number
    page: number
    limit: number
    loading: boolean
    error: string | null
}

const initialState: ArticleState = {
    items: [],
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
    error: null,
}

const articleSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(
                fetchArticles.fulfilled,
                (state, action: PayloadAction<ArticleResponse>) => {
                    state.loading = false
                    state.items = action.payload.data
                    state.total = action.payload.total
                    state.page = action.payload.page
                    state.limit = action.payload.limit
                }
            )
            .addCase(fetchArticles.rejected, (state, action) => {
                state.loading = false
                state.error =
                    (action.payload as string) || "Something went wrong fetching articles"
            })
    },
})

export const { setPage, setLimit } = articleSlice.actions
export default articleSlice.reducer