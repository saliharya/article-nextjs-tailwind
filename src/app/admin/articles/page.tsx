'use client'

import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import AdminArticleContent from '@/components/admin-article-content'
import CreateArticle from "@/components/create-article"
import { useAppSelector } from "@/store/hooks"

export default function ArticlePage() {

    const showCreate = useAppSelector((state) => state.articleReducer.list.showCreate)

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
                    <CreateArticle />
                )}
            </SidebarInset>
        </SidebarProvider>
    )
}
