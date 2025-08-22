import React from 'react'
import Logo from './logo'
import UserInfo from './user-info'

export default function Navbar() {
    return (
        <div className='px-8 py-16 w-full bg-white lg:bg-transparent max-h-16 flex flex-row justify-between items-center'>
            <div className="block lg:hidden">
                <Logo variant="black" />
            </div>
            <div className="hidden lg:block">
                <Logo variant="white" />
            </div>
            <UserInfo username={"Tes"} />
        </div>

    )
}
