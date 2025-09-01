import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "@/models/category";
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "@/api/article/ArticleApi";
import { CategoryResponse } from "@/api/article/response/categoryResponse";
import { CategorySliceState } from "@/states/categories/categorySliceState";

const initialState: CategorySliceState = {
    list: {
        items: [],
        total: 0,
        page: 1,
        limit: 10,
        loading: false,
        error: null,
        showCreate: false,
        formMode: null,
        categoryId: null,
        showDeleteModal: false,
        searchTerm: "",
    },
};

export const fetchCategories = createAsyncThunk<
    CategoryResponse,
    { page?: number; limit?: number; search?: string } | undefined,
    { rejectValue: string }
>("categories/fetchCategories", async (params, { rejectWithValue }) => {
    try {
        const response = await getCategories(params);
        return response;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to fetch categories");
    }
});

export const createCategoryThunk = createAsyncThunk<
    Category,
    { name: string },
    { rejectValue: string }
>("categories/createCategory", async (data, { rejectWithValue }) => {
    try {
        const newCategory = await createCategory(data);
        return newCategory;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to create category");
    }
});

export const updateCategoryThunk = createAsyncThunk<
    Category,
    { id: string; name: string },
    { rejectValue: string }
>("categories/updateCategory", async ({ id, name }, { rejectWithValue }) => {
    try {
        const updated = await updateCategory(id, { name });
        return updated;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to update category");
    }
});

export const deleteCategoryThunk = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>("categories/deleteCategory", async (id, { rejectWithValue }) => {
    try {
        await deleteCategory(id);
        return id;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Failed to delete category");
    }
});

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.list.page = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.list.limit = action.payload;
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.list.searchTerm = action.payload;
            state.list.page = 1;
        },
        setShowCreate: (state, action: PayloadAction<boolean>) => {
            state.list.showCreate = action.payload;
        },
        setFormMode: (state, action: PayloadAction<"create" | "edit" | null>) => {
            state.list.formMode = action.payload;
        },
        setCategoryId: (state, action: PayloadAction<string | null>) => {
            state.list.categoryId = action.payload;
        },
        closeForm: (state) => {
            state.list.showCreate = false;
            state.list.formMode = null;
            state.list.categoryId = null;
        },
        openDeleteModal: (state, action: PayloadAction<string>) => {
            state.list.showDeleteModal = true
            state.list.categoryId = action.payload
        },
        setShowDeleteModal: (state, action: PayloadAction<boolean>) => {
            state.list.showDeleteModal = action.payload;
        },
        closeDeleteModal: (state) => {
            state.list.showDeleteModal = false
            state.list.categoryId = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.list.loading = true;
                state.list.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<CategoryResponse>) => {
                state.list.loading = false;
                state.list.items = action.payload.data;
                state.list.total = action.payload.totalData;
                state.list.page = action.payload.currentPage;
                state.list.limit = state.list.limit;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.list.loading = false;
                state.list.error = action.payload || "Failed to fetch categories";
            });

        builder
            .addCase(createCategoryThunk.pending, (state) => {
                state.list.loading = true;
                state.list.error = null;
            })
            .addCase(createCategoryThunk.fulfilled, (state, action: PayloadAction<Category>) => {
                state.list.loading = false;
                state.list.items.unshift(action.payload);
                state.list.total += 1;
            })
            .addCase(createCategoryThunk.rejected, (state, action) => {
                state.list.loading = false;
                state.list.error = action.payload || "Failed to create category";
            });

        builder
            .addCase(updateCategoryThunk.pending, (state) => {
                state.list.loading = true;
                state.list.error = null;
            })
            .addCase(updateCategoryThunk.fulfilled, (state, action: PayloadAction<Category>) => {
                state.list.loading = false;
                const index = state.list.items.findIndex((c) => c.id === action.payload.id);
                if (index !== -1) state.list.items[index] = action.payload;
            })
            .addCase(updateCategoryThunk.rejected, (state, action) => {
                state.list.loading = false;
                state.list.error = action.payload || "Failed to update category";
            });

        builder
            .addCase(deleteCategoryThunk.pending, (state) => {
                state.list.loading = true;
                state.list.error = null;
            })
            .addCase(deleteCategoryThunk.fulfilled, (state, action: PayloadAction<string>) => {
                state.list.loading = false;
                state.list.items = state.list.items.filter((c) => c.id !== action.payload);
                state.list.total = state.list.total > 0 ? state.list.total - 1 : 0;
            })
            .addCase(deleteCategoryThunk.rejected, (state, action) => {
                state.list.loading = false;
                state.list.error = action.payload || "Failed to delete category";
            });
    },
});

export const {
    setPage,
    setLimit,
    setSearchTerm,
    setShowCreate,
    setFormMode,
    setCategoryId,
    openDeleteModal,
    closeDeleteModal,
    setShowDeleteModal,
    closeForm,
} = categorySlice.actions;

export default categorySlice.reducer;
