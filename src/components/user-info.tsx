import React from 'react'

interface UserInfoProps {
    username?: string
    logoVariant?: "black" | "white"
}

export default function UserInfo({ username, logoVariant }: UserInfoProps) {
    const initial = username?.charAt(0).toUpperCase()

    const usernameClass = logoVariant === "black" ? "text-slate-900" : "text-white"

    return (
        <div className="flex gap-2 items-center">
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">{initial}</span>
            </div>

            <div className={`font-medium ${usernameClass}`}>{username}</div>
        </div>
    )
}
