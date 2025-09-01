import React from "react";

interface DeleteModalProps {
    onCancel: () => void;
    onDelete: () => void;
    title?: string;
    description?: string;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
    onCancel,
    onDelete,
    title = "Delete Articles",
    description = "Deleting this article is permanent and cannot be undone. All related content will be removed.",
}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="w-[400px] h-[180px] bg-white rounded-lg border border-gray-300 p-6 flex flex-col justify-between">
                <h2 className="text-lg font-semibold">{title}</h2>

                <p className="text-gray-500 mt-2 flex-1">{description}</p>

                <div className="flex justify-end gap-4 mt-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
