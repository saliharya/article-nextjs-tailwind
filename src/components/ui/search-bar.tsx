import { Search } from 'lucide-react'
import React from 'react'
import { Input } from './input'

export default function SearchBar() {
    return (
        <div className="relative w-full bg-white rounded-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search articles"
                className="pl-8"
            />
        </div>
    )
}