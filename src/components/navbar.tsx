'use client'

import React, { useEffect } from 'react'
import Logo from './logo'
import UserInfo from './user-info'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchProfile } from '@/store/slices/authSlice'

export default function Navbar() {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(
        (state) => state.authReducer
    )

    useEffect(() => { dispatch(fetchProfile()) }, [dispatch])

    return (
        <div className='px-8 py-16 w-full bg-white lg:bg-transparent max-h-16 flex flex-row justify-between items-center'>
            <div className="block lg:hidden">
                <Logo variant="black" />
            </div>
            <div className="hidden lg:block">
                <Logo variant="white" />
            </div>
            <UserInfo username={user?.username} />
        </div>

    )
}
