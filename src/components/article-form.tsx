'use client'

import React, { useState, useEffect, useMemo } from "react"
import { ArrowLeft, Upload } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import {
    setShowCreate,
    setCategory,
    fetchArticles,
} from "@/store/slices/articleSlice"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CategoryDropdown } from "./category-dropdown"
import RichTextEditor from "./rich-text-editor"
import { createArticleThunk, updateArticleThunk } from "@/store/slices/articleSlice"
import { uploadThumbnail } from "@/api/article/ArticleApi"

interface ArticleFormProps {
    mode: "create" | "edit"
    initialData?: {
        id?: string
        title?: string
        content?: string
        categoryId?: string
        imageUrl?: string
    }
    onSuccess?: () => void
}

export function ArticleForm({ mode, initialData, onSuccess }: ArticleFormProps) {
    const dispatch = useAppDispatch()
    const { selectedCategory, items: articles, page, limit, searchTerm } =
        useAppSelector((state) => state.articleReducer.list)

    const categories = useMemo(() => {
        if (!articles) return []
        const map = new Map()
        for (const a of articles) {
            if (a.category?.id) map.set(a.category.id, a.category)
        }
        return Array.from(map.values())
    }, [articles])

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

    const [title, setTitle] = useState(initialData?.title || "")
    const [content, setContent] = useState(initialData?.content || "")
    const [categoryId, setCategoryId] = useState(
        initialData?.categoryId || selectedCategory || ""
    )
    const [thumbnail, setThumbnail] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnail(e.target.files[0])
        }
    }

    const handleSubmit = async () => {
        if (!title || !content || !categoryId) {
            alert("Please fill in all required fields")
            return
        }

        try {
            let imageUrl: string | undefined = initialData?.imageUrl;

            if (thumbnail) {
                imageUrl = await uploadThumbnail(thumbnail);
            }

            if (mode === "create") {
                await dispatch(
                    createArticleThunk({ title, content, categoryId, imageUrl })
                ).unwrap()
            } else if (mode === "edit" && initialData?.id) {
                await dispatch(
                    updateArticleThunk({ id: initialData.id, title, content, categoryId, imageUrl })
                ).unwrap()
            }

            dispatch(setShowCreate(false));
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error("Failed to submit article:", err);
        }
    }

    return (
        <div className="p-6">
            <Card className="w-full h-full">
                <CardHeader className="font-medium text-base flex items-center gap-2">
                    <ArrowLeft
                        className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() => dispatch(setShowCreate(false))}
                    />
                    {mode === "create" ? "Create Article" : "Edit Article"}
                </CardHeader>
                <Separator />

                <CardContent className="space-y-6 mt-4">
                    <div className="flex flex-col gap-2">
                        <Label>Thumbnails</Label>
                        <label
                            htmlFor="file-upload"
                            className="flex flex-col items-center justify-center border border-dashed rounded-md p-6 cursor-pointer hover:bg-gray-50 h-[187px] w-[223px]"
                        >
                            {thumbnail ? (
                                <img
                                    src={URL.createObjectURL(thumbnail)}
                                    alt="Thumbnail"
                                    className="h-full w-full object-cover rounded-md"
                                />
                            ) : initialData?.thumbnailUrl ? (
                                <img
                                    src={initialData.thumbnailUrl}
                                    alt="Thumbnail"
                                    className="h-full w-full object-cover rounded-md"
                                />
                            ) : (
                                <>
                                    <Upload className="w-8 h-8 text-gray-500" />
                                    <span className="text-sm text-gray-600 mt-2">
                                        Click to select files
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        Support File Type: jpg or png
                                    </span>
                                </>
                            )}
                            <Input
                                id="file-upload"
                                type="file"
                                className="hidden"
                                accept=".jpg,.jpeg,.png"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Title</Label>
                        <Input
                            placeholder="Input title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label>Category</Label>
                        <CategoryDropdown
                            categories={categories}
                            selectedCategory={categoryId}
                            onSelect={(id) => setCategoryId(id)}
                        />
                        <p className="text-xs text-gray-500">
                            The existing category list can be seen in the{" "}
                            <span className="text-blue-600 underline cursor-pointer">
                                category
                            </span>{" "}
                            menu
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Content</label>
                        <RichTextEditor content={content} onChange={setContent} />
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={() => dispatch(setShowCreate(false))}
                    >
                        Cancel
                    </Button>
                    <Button variant="secondary">Preview</Button>
                    <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleSubmit}
                    >
                        {mode === "create" ? "Upload" : "Save Changes"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
