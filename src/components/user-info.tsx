import React from 'react'

interface UserInfoProps {
    username?: string
}

export default function UserInfo({ username }: UserInfoProps) {
    const initial = username?.charAt(0).toUpperCase()

    return (
        <div className="flex gap-2 items-center">
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">{initial}</span>
            </div>

            <div className="font-medium">{username}</div>
        </div>
    )
}
