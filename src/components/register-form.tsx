"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { RegisterRequest } from "@/api/auth/request/registerRequest"
import { registerUser } from "@/store/slices/authSlice"

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const { loading, error, user } = useAppSelector((state) => state.authReducer)
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("Pilih role")

    const dispatch = useAppDispatch();

    const handleRegister = async (data: RegisterRequest) => {
        const resultAction = await dispatch(registerUser(data));
        if (registerUser.fulfilled.match(resultAction)) {
            router.push('/login');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (role === "Pilih role") {
            alert("Please select a role");
            return;
        }

        const data: RegisterRequest = { username, password, role: role as "User" | "Admin" };
        await handleRegister(data);
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardContent>
                    <a
                        href="#"
                        className="flex items-center gap-2 self-center justify-center font-medium mb-8"
                    >
                        <div className="text-primary-foreground flex w-6 h-6 items-center justify-center rounded-md">
                            <Image
                                src="/icons/Logo.svg"
                                alt="Logo"
                                width={20.18}
                                height={22.33}
                            />
                        </div>
                        Logoipsum
                    </a>
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

                                <div className="grid gap-3">
                                    <Label htmlFor="role">Role</Label>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button
                                                id="role"
                                                type="button"
                                                className="w-full rounded-md border px-3 py-2 text-left text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                {role}
                                            </button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent className="w-full">
                                            <DropdownMenuItem onSelect={() => setRole("User")}>
                                                User
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => setRole("Admin")}>
                                                Admin
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <Button type="submit" className="w-full">
                                    Register
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <a href="/login" className="underline underline-offset-4">
                                    Login
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
