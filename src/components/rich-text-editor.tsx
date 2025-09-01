"use client"

import { useEditor, EditorContent, Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import { useState } from "react"
import { RichTextToolbar } from "./richtext-toolbar"

export default function RichTextEditor() {
    const [wordCount, setWordCount] = useState(0)

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Placeholder.configure({ placeholder: "Type a content..." }),
        ],
        content: "",
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            const text = editor.state.doc.textBetween(
                0,
                editor.state.doc.content.size,
                " "
            )
            setWordCount(text.trim().split(/\s+/).filter(Boolean).length)
        },
    })

    if (!editor) return null

    return (
        <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
            <RichTextToolbar editor={editor} />

            <EditorContent
                editor={editor}
                className="px-4 py-3 min-h-[250px] outline-none prose prose-sm max-w-none"
            />

            <div className="border-t px-4 py-2 text-xs text-gray-500">
                {wordCount} Words
            </div>
        </div>
    )
}
