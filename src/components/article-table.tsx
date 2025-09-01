import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ArticleActions } from "./article-actions"

export function ArticleTable({ articles }: { articles: any[] }) {
    if (!articles?.length) {
        return (
            <div className="text-center text-slate-500 py-6">
                No articles available
            </div>
        )
    }

    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-gray-100">
                    <TableHead className="text-center text-slate-600">Thumbnail</TableHead>
                    <TableHead className="text-center text-slate-600">Title</TableHead>
                    <TableHead className="text-center text-slate-600">Category</TableHead>
                    <TableHead className="text-center text-slate-600">Created At</TableHead>
                    <TableHead className="text-center text-slate-600">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {articles.map((article) => (
                    <TableRow key={article.id}>
                        <TableCell className="text-center">
                            <img
                                src={article.imageUrl || "/placeholder.png"}
                                alt={article.title}
                                className="w-16 h-12 rounded object-cover mx-auto"
                            />
                        </TableCell>
                        <TableCell className="text-center text-slate-600 text-sm">
                            {article.title}
                        </TableCell>
                        <TableCell className="text-center text-slate-600 text-sm">
                            {article.category?.name ?? "-"}
                        </TableCell>
                        <TableCell className="text-center text-slate-600 text-sm">
                            {new Date(article.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-center text-slate-600 text-sm">
                            <ArticleActions
                                onPreview={() => console.log("Preview", article.id)}
                                onEdit={() => console.log("Edit", article.id)}
                                onDelete={() => console.log("Delete", article.id)}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}