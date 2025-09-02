'use client'
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ProfileFieldProps {
    label: string;
    value: string;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value }) => (
    <div className="grid grid-cols-3 items-center bg-gray-50 p-3 rounded-md">
        <span className="text-gray-600 font-medium">{label}</span>
        <span className="text-gray-600 font-medium text-center">:</span>
        <span className="text-slate-900 font-semibold text-center">{value}</span>
    </div>
);

const UserProfilePage: React.FC = () => {
    const user = useAppSelector((state) => state.authReducer.user);
    const router = useRouter();

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-gray-500">Loading user data...</p>
            </div>
        );
    }

    const initial = user.username.charAt(0).toUpperCase();

    const handleBackToHome = () => {
        if (user.role === 'Admin') {
            router.push('/admin/articles');
        } else {
            router.push('/');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-[400px] bg-white rounded-xl shadow-lg flex flex-col items-center py-6 px-4 gap-y-9">
                <h2 className="text-slate-900 font-semibold text-xl text-center font-['Archivo']">
                    User Profile
                </h2>
                <div className="w-16 aspect-square rounded-full bg-blue-200 flex items-center justify-center">
                    <span className="text-white font-semibold text-3xl">{initial}</span>
                </div>
                <div className="w-[368px] flex flex-col gap-y-3">
                    <ProfileField label="Username" value={user.username} />
                    <ProfileField label="Password" value="********" />
                    <ProfileField label="Role" value={user.role} />
                </div>
                <button
                    onClick={handleBackToHome}
                    className="w-[368px] h-[40px] bg-blue-600 text-white rounded-md flex items-center justify-center px-4 py-2 text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 gap-1.5"
                >
                    Back to home
                </button>
            </div>
        </div>
    );
};

export default UserProfilePage;
