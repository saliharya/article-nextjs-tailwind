import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ArticleActions } from "./article-actions"
import noImage from '../../public/images/no-image.png'
import { fetchArticleById, openDeleteModal, setFormMode, setShowCreate } from "@/store/slices/articleSlice"
import { useAppDispatch } from "@/store/hooks"
import { format } from "date-fns"

export function ArticleTable({ articles }: { articles: any[] }) {

    const dispatch = useAppDispatch()

    if (!articles?.length) {
        return (
            <div className="text-center text-slate-500 py-6">
                No articles available
            </div>
        )
    }

    return (
        <Table className="table-fixed w-full">
            <TableHeader>
                <TableRow className="bg-gray-100">
                    <TableHead className="w-1/5 text-center text-slate-600">Thumbnail</TableHead>
                    <TableHead className="w-1/5 text-center text-slate-600">Title</TableHead>
                    <TableHead className="w-1/5 text-center text-slate-600">Category</TableHead>
                    <TableHead className="w-1/5 text-center text-slate-600">Created At</TableHead>
                    <TableHead className="w-1/5 text-center text-slate-600">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {articles.map((article) => (
                    <TableRow key={article.id}>
                        <TableCell className="text-center w-1/5">
                            <img
                                src={article.imageUrl ?? noImage.src}
                                alt={article.title}
                                className="w-[60px] h-[60px] rounded-[6px] object-cover mx-auto"
                            />
                        </TableCell>
                        <TableCell className="text-slate-600 text-sm w-1/5 break-words whitespace-normal">
                            {article.title}
                        </TableCell>
                        <TableCell className="text-center text-slate-600 text-sm w-1/5">
                            {article.category?.name ?? "-"}
                        </TableCell>
                        <TableCell className="text-center text-slate-600 text-sm w-1/5">
                            {format(new Date(article.createdAt), 'MMMM dd, yyyy HH:mm:ss')}
                        </TableCell>
                        <TableCell className="text-center text-slate-600 text-sm w-1/5">
                            <ArticleActions
                                onPreview={() => console.log("Preview", article.id)}
                                onEdit={() => {
                                    dispatch(setShowCreate(true))
                                    dispatch(setFormMode("edit"))
                                    dispatch(fetchArticleById(article.id))
                                }}
                                onDelete={() => dispatch(openDeleteModal(article.id))}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}