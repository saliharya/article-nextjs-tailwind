export function ToolbarButton({
    onClick,
    isActive,
    disabled,
    children,
}: {
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
    children: React.ReactNode
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`p-1 rounded hover:bg-gray-200 ${isActive ? "text-blue-600" : ""
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {children}
        </button>
    )
}
