import { Category } from "@/models/category";

export interface CategorySliceState {
    list: {
        items: Category[];
        categoryId: string | null;
        total: number;
        page: number;
        limit: number;
        loading: boolean;
        error: string | null;
        showCreate: boolean;
        formMode: "create" | "edit" | null;
        showDeleteModal: boolean;
        searchTerm: string;
    };
}