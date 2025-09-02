'use client'

import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import AdminArticleContent from '@/components/admin-article-content'
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { ArticleForm } from "@/components/article-form"
import { closeForm, createArticleThunk, deleteArticleThunk, updateArticleThunk, closeDeleteModal } from "@/store/slices/articleSlice"
import { DeleteModal } from "@/components/delete-modal"
import { ArticleInput } from "@/models/article"

export default function ArticlePage() {
    const dispatch = useAppDispatch()
    const { showCreate, formMode, showDeleteModal, deletingArticleId } = useAppSelector(
        (state) => state.articleReducer.list
    )
    const { article } = useAppSelector((state) => state.articleReducer.detail)

    const handleCreate = (data: ArticleInput) => {
        dispatch(createArticleThunk(data))
            .unwrap()
            .then(() => {
                dispatch(closeForm())
            })
    }

    const handleUpdate = (data: ArticleInput) => {
        if (!article?.id) return
        dispatch(updateArticleThunk({ id: article.id, ...data }))
            .unwrap()
            .then(() => {
                dispatch(closeForm())
            })
    }

    const handleDelete = async () => {
        if (!deletingArticleId) return
        await dispatch(deleteArticleThunk(deletingArticleId)).unwrap()
        dispatch(closeDeleteModal())
    }

    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <SidebarInset>
                <div className="flex items-center justify-between border-b w-full h-[68px] px-6 pt-5 pb-4">
                    <span className="font-archivo font-semibold text-[20px] leading-[28px]">
                        Articles
                    </span>
                </div>
                {!showCreate && (
                    <AdminArticleContent />
                )}
                {showCreate && (
                    <ArticleForm
                        mode={formMode || "create"}
                        initialData={
                            formMode === "edit" && article
                                ? {
                                    ...article,
                                    imageUrl: article.imageUrl ?? undefined,
                                }
                                : undefined
                        }
                        onSubmit={formMode === "edit" ? handleUpdate : handleCreate}
                    />
                )}

                {showDeleteModal && (
                    <DeleteModal
                        onCancel={() => dispatch(closeDeleteModal())}
                        onDelete={handleDelete}
                        title="Delete Articles"
                        description="Deleting this article is permanent and cannot be undone. All related content will be removed."
                    />
                )}
            </SidebarInset>
        </SidebarProvider>
    )
}
