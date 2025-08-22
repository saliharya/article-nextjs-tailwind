'use client'

import React, { useEffect } from "react"
import ArticleItem from "./article-item"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchArticles, setPage } from "@/store/slices/articleSlice"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination"
import { useRouter } from "next/navigation"

interface ArticleContentProps {
    isDetailPage?: boolean
    currentId?: string
}

export default function ArticleContent({ isDetailPage = false, currentId }: ArticleContentProps) {

    const dispatch = useAppDispatch()
    const router = useRouter();
    const { items, loading, error, page, limit, total, selectedCategory, searchTerm } = useAppSelector(
        state => state.articleReducer.list
    )


    const totalPages = Math.ceil(total / limit)

    useEffect(() => {
        dispatch(fetchArticles({
            page,
            limit,
            category: selectedCategory || undefined,
            title: searchTerm || undefined
        }))
    }, [dispatch, page, limit, selectedCategory, searchTerm])

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    const getPageNumbers = () => {
        const pages: (number | "ellipsis")[] = []
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i)
        } else {
            if (page <= 3) {
                pages.push(1, 2, 3, "ellipsis", totalPages)
            } else if (page >= totalPages - 2) {
                pages.push(1, "ellipsis", totalPages - 2, totalPages - 1, totalPages)
            } else {
                pages.push(1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages)
            }
        }
        return pages
    }

    const handleClick = (id: string) => {
        router.push(`/articles/${id}`);
    }

    const displayedArticles = isDetailPage
        ? items
            .filter(a => a.id !== currentId)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
        : items

    return (
        <div className="w-full min-h-screen flex justify-center">
            <div className="w-[1240px] pt-4 flex flex-col gap-5">
                <div className="font-medium text-base text-slate-600">
                    Showing : {Math.min(page * limit, total)} of {total} articles
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:px-0 lg:py-0 pt-10 pb-14 px-5">
                    {displayedArticles.map((article) => (
                        <ArticleItem
                            key={article.id}
                            article={article}
                            onClick={() => handleClick(article.id)}
                        />
                    ))}
                </div>

                {((totalPages > 1) && !isDetailPage) && (
                    <Pagination className="mb-14">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => page > 1 && dispatch(setPage(page - 1))}
                                    className={page === 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>

                            {getPageNumbers().map((p, idx) =>
                                p === "ellipsis" ? (
                                    <PaginationItem key={`ellipsis-${idx}`}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                ) : (
                                    <PaginationItem key={p}>
                                        <PaginationLink
                                            isActive={page === p}
                                            onClick={() => dispatch(setPage(p))}
                                        >
                                            {p}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            )}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => page < totalPages && dispatch(setPage(page + 1))}
                                    className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </div>
    )
}