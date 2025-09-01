import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { format } from "date-fns";
import {
    setShowCreate,
    setFormMode,
    setCategoryId,
    setShowDeleteModal,
} from "@/store/slices/categorySlice";
import { openDeleteModal } from "@/store/slices/articleSlice";
import { CategoryOptions } from "./category-actions";

interface Category {
    id: string;
    name: string;
    createdAt: string;
}

interface CategoryTableProps {
    categories: Category[];
}

export function CategoryTable({ categories }: CategoryTableProps) {
    const dispatch = useAppDispatch();

    if (!categories?.length) {
        return (
            <div className="text-center text-slate-500 py-6">
                No categories available
            </div>
        );
    }

    return (
        <Table className="table-fixed w-full">
            <TableHeader>
                <TableRow className="bg-gray-100">
                    <TableHead className="text-center text-slate-600 w-1/2">Category</TableHead>
                    <TableHead className="text-center text-slate-600 w-1/2">Created At</TableHead>
                    <TableHead className="text-center text-slate-600 w-1/4">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.map((category) => (
                    <TableRow key={category.id}>
                        <TableCell className="text-center text-slate-600 text-sm">
                            {category.name}
                        </TableCell>
                        <TableCell className="text-center text-slate-600 text-sm">
                            {format(new Date(category.createdAt), 'MMMM dd, yyyy HH:mm:ss')}
                        </TableCell>
                        <TableCell className="text-center text-slate-600 text-sm">
                            <div className="flex justify-center gap-2">
                                <CategoryOptions
                                    onEdit={() => {
                                        dispatch(setShowCreate(true));
                                        dispatch(setFormMode("edit"));
                                        dispatch(setCategoryId(category.id));
                                    }}
                                    onDelete={() => {
                                        dispatch(setCategoryId(category.id));
                                        dispatch(setShowDeleteModal(true));
                                    }}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table >
    );
}
