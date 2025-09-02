'use client'

import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { DeleteModal } from "@/components/delete-modal"
import AdminCategoryContent from "@/components/admin-category-content"
import { closeDeleteModal, closeForm, createCategoryThunk, deleteCategoryThunk, setShowDeleteModal, updateCategoryThunk } from "@/store/slices/categorySlice"
import CategoryFormModal from "@/components/category-form-modal"
import { CategoryInput } from "@/models/category"

export default function CategoriesPage() {
    const dispatch = useAppDispatch()

    const { showCreate, formMode, categoryId, showDeleteModal } = useAppSelector(
        (state) => state.categoryReducer.list
    );

    const category = useAppSelector((state) =>
        state.categoryReducer.list.items.find((c) => c.id === categoryId)
    );

    const handleCreate = (data: CategoryInput) => {
        dispatch(createCategoryThunk(data))
            .unwrap()
            .then(() => {
                dispatch(closeForm())
            })
    }

    const handleUpdate = (data: CategoryInput) => {
        if (!categoryId) return
        dispatch(updateCategoryThunk({ id: categoryId, ...data }))
            .unwrap()
            .then(() => {
                dispatch(closeForm())
            })
    }

    const handleDelete = async () => {
        if (!categoryId) return;
        await dispatch(deleteCategoryThunk(categoryId)).unwrap();
        dispatch(setShowDeleteModal(false));
    };

    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <SidebarInset>
                <div className="flex items-center justify-between border-b w-full h-[68px] px-6 pt-5 pb-4">
                    <span className="font-archivo font-semibold text-[20px] leading-[28px]">
                        Categories
                    </span>
                </div>
                {!showCreate && (
                    <AdminCategoryContent />
                )}
                {showCreate && (
                    <CategoryFormModal
                        mode={formMode || "create"}
                        initialData={formMode === "edit" ? { name: category?.name } : undefined}
                        onCancel={() => dispatch(closeForm())}
                        onSubmit={formMode === "edit" ? handleUpdate : handleCreate}
                    />
                )}

                {showDeleteModal && (
                    <DeleteModal
                        onCancel={() => dispatch(closeDeleteModal())}
                        onDelete={handleDelete}
                        title="Delete Category"
                        description={`Delete category "${category?.name}"? This will remove it from master data permanently.`}
                    />
                )}
            </SidebarInset>
        </SidebarProvider>
    )
}
