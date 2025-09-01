import React, { useEffect, useMemo } from 'react'

import { Card, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import SearchBar from '@/components/search-bar'
import { Plus } from 'lucide-react'
import { setCategory, setPage, setShowCreate } from '@/store/slices/articleSlice'
import { Button } from '@/components/ui/button'
import { CategoryDropdown } from '@/components/category-dropdown'
import { ArticleTable } from '@/components/article-table'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination"
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchArticles } from '@/store/slices/articleSlice'

export default function AdminArticleContent() {

    const dispatch = useAppDispatch()
    const { selectedCategory, items: articles, page, limit, total, searchTerm } =
        useAppSelector((state) => state.articleReducer.list)

    const categories = useMemo(() => {
        if (!articles) return []
        const map = new Map()
        for (const a of articles) {
            if (a.category?.id) map.set(a.category.id, a.category)
        }
        return Array.from(map.values())
    }, [articles])

    const totalPages = Math.ceil(total / limit)

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

    useEffect(() => {
        dispatch(
            fetchArticles({
                page,
                limit,
                category: selectedCategory || undefined,
                title: searchTerm || undefined,
            })
        )
    }, [dispatch, page, limit, selectedCategory, searchTerm])

    return (
        <div className="p-6">
            <Card className="w-full h-full">
                <CardHeader className="font-medium text-base">
                    Total Articles : {articles?.length ?? 0}
                </CardHeader>
                <Separator />

                <div className="flex flex-row px-6 justify-between">
                    <div className="flex flex-row gap-2">
                        <CategoryDropdown
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelect={(id) => dispatch(setCategory(id))}
                        />
                        <SearchBar placeholder="Search by title" />
                    </div>
                    <Button onClick={() => dispatch(setShowCreate(true))}>
                        <Plus className="size-4" />
                        Add Articles
                    </Button>
                </div>

                <ArticleTable articles={articles} />
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
            </Card>
        </div>
    )
}
