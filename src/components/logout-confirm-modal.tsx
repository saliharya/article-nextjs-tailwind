'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { logout } from '@/store/slices/authSlice'

interface LogoutConfirmModalProps {
    open: boolean
    onClose: () => void
}

export default function LogoutConfirmModal({ open, onClose }: LogoutConfirmModalProps) {
    const dispatch = useDispatch()
    const router = useRouter()

    const handleLogout = () => {
        dispatch(logout())
        router.push('/login')
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className="w-[400px] p-6 rounded-lg border"
            >
                <DialogHeader className="mb-2">
                    <DialogTitle className="font-['Archivo'] font-semibold text-[18px] leading-7">
                        Logout
                    </DialogTitle>
                </DialogHeader>
                <p className="font-['Archivo'] font-normal text-[14px] leading-5 text-slate-500">
                    Are you sure want to logout?
                </p>
                <DialogFooter className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="default" onClick={handleLogout}>
                        Logout
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}