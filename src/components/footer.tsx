import React from 'react'
import Logo from './logo'

export default function Footer() {
    return (
        <div className='h-24 bg-[#2563EBDB] flex flex-col items-center justify-center'>
            <div className="flex flex-col items-center lg:flex-row lg:gap-4">
                <Logo variant='white' />
                <div className="text-white text-sm mt-2 lg:mt-0">© 2025 Blog genzet. All rights reserved.</div>
            </div>
        </div>
    )
}
