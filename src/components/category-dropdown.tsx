import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Category } from '@/models/category'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ChevronDown, Plus } from 'lucide-react'

export function CategoryDropdown({ categories, selectedCategory, onSelect }: {
    categories: Category[],
    selectedCategory: string | null,
    onSelect: (id: string) => void
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-between w-full bg-white rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none lg:w-[344px]">
                {selectedCategory
                    ? categories.find((c) => c.id === selectedCategory)?.name
                    : "Select category"}
                <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                className="w-[var(--radix-dropdown-menu-trigger-width)]"
            >
                {categories.map((category) => (
                    <DropdownMenuItem
                        key={category.id}
                        onClick={() => onSelect(category.id)}
                    >
                        {category.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}