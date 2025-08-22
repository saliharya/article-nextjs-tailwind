'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useState } from "react"
import { fetchProfile, loginUser } from "@/store/slices/authSlice"
import { useRouter } from "next/navigation"
import Logo from "./logo"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const dispatch = useAppDispatch()
    const { loading, error, user } = useAppSelector((state) => state.authReducer)
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const result = await dispatch(loginUser({ username: username, password }))

        if (loginUser.fulfilled.match(result)) {
            await dispatch(fetchProfile())

            router.push("/")
        } else {
            console.error('Login failed: ', result.payload)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardContent>
                    <div className="flex self-center justify-center mb-8">
                        <Logo />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        type="username"
                                        placeholder="Input username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Input password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required />
                                </div>
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="/register" className="underline underline-offset-4">
                                    Register
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
