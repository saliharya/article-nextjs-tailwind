export function ArticleActions({ onPreview, onEdit, onDelete }: {
    onPreview: () => void,
    onEdit: () => void,
    onDelete: () => void,
}) {
    return (
        <div className="flex justify-center gap-3">
            <span
                className="text-blue-500 cursor-pointer underline"
                onClick={onPreview}
            >
                Preview
            </span>
            <span
                className="text-blue-500 cursor-pointer underline"
                onClick={onEdit}
            >
                Edit
            </span>
            <span
                className="text-red-500 cursor-pointer underline"
                onClick={onDelete}
            >
                Delete
            </span>
        </div>
    )
}