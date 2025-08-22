'use client'

import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useAppDispatch } from '@/store/hooks';
import { setSearchTerm } from '@/store/slices/articleSlice';

export default function SearchBar() {

    const dispatch = useAppDispatch();
    const [query, setQuery] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            dispatch(setSearchTerm(query));
        }, 300);

        return () => clearTimeout(handler);
    }, [query, dispatch]);

    return (
        <div className="relative w-full bg-white rounded-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles"
                className="pl-8"
            />
        </div>
    )
}