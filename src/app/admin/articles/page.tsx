'use client'

import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import AdminArticleContent from '@/components/admin-article-content'
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { ArticleForm } from "@/components/article-form"
import { closeForm, createArticleThunk, updateArticleThunk } from "@/store/slices/articleSlice"

export default function ArticlePage() {
    const dispatch = useAppDispatch()
    const { showCreate, formMode } = useAppSelector(
        (state) => state.articleReducer.list
    )
    const { article } = useAppSelector((state) => state.articleReducer.detail)

    const handleCreate = (data: any) => {
        dispatch(createArticleThunk(data))
            .unwrap()
            .then(() => {
                dispatch(closeForm())
            })
    }

    const handleUpdate = (data: any) => {
        if (!article?.id) return
        dispatch(updateArticleThunk({ id: article.id, ...data }))
            .unwrap()
            .then(() => {
                dispatch(closeForm())
            })
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
                        initialData={formMode === "edit" ? article : undefined}
                        onSubmit={formMode === "edit" ? handleUpdate : handleCreate}
                    />
                )}
            </SidebarInset>
        </SidebarProvider>
    )
}
