import Image from 'next/image'
import React from 'react'
import heroImage from '../../public/images/hero.jpg'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import SearchBar from './ui/search-bar'
import Navbar from './navbar'

export default function HeroSection() {
    return (
        <div className="relative w-full h-[560px] lg:h-[500px]">
            <Image src={heroImage} alt="hero" fill className="object-cover" />
            <div className="absolute inset-0 bg-[#2563EBDB]" />

            <div className="absolute top-0 left-0 w-full">
                <Navbar />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center w-full px-4">
                <div className="w-full max-w-[730px] mx-auto text-center">
                    <p className="text-white text-sm font-bold">Blog genzet</p>
                    <h1 className="text-white text-4xl font-medium py-4">
                        The Journal : Design Resources, <br />
                        Interviews, and Industry News
                    </h1>
                    <p className="text-white font-medium">
                        Your daily dose of design insights!
                    </p>

                    <div className="pt-8">
                        <div className="bg-blue-500 flex flex-col lg:flex-row p-1 rounded-md w-full max-w-[608px] mx-auto gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center justify-between w-full bg-white rounded-md px-3 py-2 text-sm text-left shadow-sm focus:outline-none lg:w-[344px]">
                                    {"Select category"}
                                    <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-full">
                                    <DropdownMenuItem>Category 1</DropdownMenuItem>
                                    <DropdownMenuItem>Category 2</DropdownMenuItem>
                                    <DropdownMenuItem>Category 3</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <SearchBar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
