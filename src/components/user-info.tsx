import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { LogOut } from 'lucide-react'
import { logout } from '@/store/slices/authSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

interface UserInfoProps {
    username?: string
    logoVariant?: "black" | "white"
}

export default function UserInfo({ username, logoVariant }: UserInfoProps) {
    const initial = username?.charAt(0).toUpperCase()

    const usernameClass = logoVariant === "black" ? "text-slate-900" : "text-white"

    const [visible, setVisible] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const toggleRef = useRef<HTMLDivElement>(null)

    const dispatch = useDispatch()
    const router = useRouter()

    const handleLogout = () => {
        dispatch(logout())
        router.push('/login')
        setVisible(false)
    }

    const handleMyAccountClick = () => {
        router.push('/profile')
        setVisible(false)
    }

    const toggleDropdown = () => setVisible((prev) => !prev)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                toggleRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !toggleRef.current.contains(event.target as Node)
            ) {
                setVisible(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (<>
        <button
            onClick={toggleDropdown}
            className="flex gap-2 items-center cursor-pointer focus:outline-none"
        >
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">{initial}</span>
            </div>

            <div className={`font-medium ${usernameClass}`}>{username}</div>
        </button>
        {visible && (
            <Card
                ref={dropdownRef}
                className="absolute w-[224px] top-20 right-6 rounded-md border border-slate-200 shadow-md mt-2 z-50"
            >
                <CardContent className="px-0 py-0">
                    <div
                        className="text-slate-600 text-sm px-4 border-b py-2 hover:bg-slate-100 hover:cursor-pointer transition-colors duration-200"
                        onClick={handleMyAccountClick}
                    >
                        My Account
                    </div>

                    <Button
                        variant="ghost"
                        className="w-full flex items-center justify-start gap-2 text-red-600 hover:bg-red-50 hover:cursor-pointer transition-colors duration-200"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-4 h-4 text-red-600" />
                        Logout
                    </Button>
                </CardContent>
            </Card>
        )}
    </>
    )
}
