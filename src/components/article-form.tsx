import { useEffect, useMemo } from "react"
import { ArrowLeft, Upload } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setShowCreate, setCategory, fetchArticles } from "@/store/slices/articleSlice"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CategoryDropdown } from "./category-dropdown"
import RichTextEditor from "./rich-text-editor"

interface ArticleFormProps {
    mode: "create" | "edit"
    initialData?: {
        id?: string
        title?: string
        content?: string
        categoryId?: string
        thumbnailUrl?: string
    }
    onSubmit: (data: {
        title: string
        content: string
        categoryId: string
        thumbnail?: File | null
    }) => void
}

export function ArticleForm({ mode, initialData, onSubmit }: ArticleFormProps) {
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
                            {initialData?.thumbnailUrl ? (
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
                                        Support File Type : jpg or png
                                    </span>
                                </>
                            )}
                            <Input
                                id="file-upload"
                                type="file"
                                className="hidden"
                                accept=".jpg,.jpeg,.png"
                                onChange={() => null}
                            />
                        </label>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Title</Label>
                        <Input
                            placeholder="Input title"
                            defaultValue={initialData?.title || ""}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label>Category</Label>
                        <CategoryDropdown
                            categories={categories}
                            selectedCategory={initialData?.categoryId || selectedCategory}
                            onSelect={(id) => dispatch(setCategory(id))}
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
                        <RichTextEditor content={initialData?.content || ""} />
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
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        {mode === "create" ? "Upload" : "Save Changes"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
