import { Category } from "@/models/category"

export interface CategoryResponse {
    data: Category[]
    totalData: number
    currentPage: number
    totalPages: number
}