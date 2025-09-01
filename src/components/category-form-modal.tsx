'use client'

import React, { useState, useEffect } from 'react'

interface CategoryFormModalProps {
    mode: 'create' | 'edit'
    initialData?: {
        id?: string
        name?: string
    }
    onSubmit: (data: { name: string }) => void
    onCancel: () => void
}

export default function CategoryFormModal({ mode, initialData, onSubmit, onCancel }: CategoryFormModalProps) {
    const [name, setName] = useState(initialData?.name || '')
    const [error, setError] = useState('')

    useEffect(() => {
        setName(initialData?.name || '')
    }, [initialData])

    const handleSubmit = () => {
        if (!name.trim()) {
            setError('Category field cannot be empty')
            return
        }
        onSubmit({ name: name.trim() })
        setName('')
        setError('')
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="w-[400px] bg-white rounded-lg border border-gray-300 p-6 flex flex-col">
                <h2 className="text-lg font-semibold mb-4">
                    {mode === 'create' ? 'Add Category' : 'Edit Category'}
                </h2>

                <input
                    type="text"
                    placeholder="Input Category"
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                        if (error) setError('')
                    }}
                />
                {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        {mode === 'create' ? 'Add' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    )
}
