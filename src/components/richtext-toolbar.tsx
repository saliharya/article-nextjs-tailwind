import { Editor } from "@tiptap/react"
import {
    Bold,
    Italic,
    Undo,
    List,
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight,
    ImageIcon,
    Redo,
} from "lucide-react"
import { ToolbarButton } from "./toolbar-button"

export function RichTextToolbar({ editor }: { editor: Editor }) {
    if (!editor) return null

    const canUndo = editor.can().undo()
    const canRedo = editor.can().redo()

    return (
        <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
            <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!canUndo}
            >
                <Undo
                    className={`w-4 h-4 ${!canUndo ? "text-gray-400" : ""}`}
                />
            </ToolbarButton>

            <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!canRedo}
            >
                <Redo
                    className={`w-4 h-4 ${!canRedo ? "text-gray-400" : ""}`}
                />
            </ToolbarButton>

            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive("bold")}
            >
                <Bold className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive("italic")}
            >
                <Italic className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
                <List className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign("left").run()}
            >
                <AlignLeft className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign("center").run()}
            >
                <AlignCenter className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign("right").run()}
            >
                <AlignRight className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarButton
                onClick={() => {
                    const url = window.prompt("Enter image URL")
                    if (url) editor.chain().focus().setImage({ src: url }).run()
                }}
            >
                <ImageIcon className="w-4 h-4" />
            </ToolbarButton>
        </div>
    )
}