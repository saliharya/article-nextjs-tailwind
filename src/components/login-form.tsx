'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useRouter } from "next/navigation"
import Logo from "./logo"
import { User } from "@/models/user"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { fetchProfile, loginUser } from "@/store/slices/authSlice"
import { getErrorMessage } from "@/utils/getErrorMessage"

const schema = z.object({
    username: z.string().nonempty({ message: "Please enter your username" }),
    password: z.string().nonempty({ message: "Please enter your password" }),
})

type LoginFormInputs = z.infer<typeof schema>

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const dispatch = useAppDispatch()
    const { loading, error } = useAppSelector((state) => state.authReducer)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (data: LoginFormInputs) => {
        const result = await dispatch(loginUser(data))

        if (loginUser.fulfilled.match(result)) {
            const profileResult = await dispatch(fetchProfile());
            const profile = profileResult.payload as User;

            if (profile.role === "Admin") {
                router.push("/admin/articles");
            } else {
                router.push("/");
            }
        } else {
            console.error("Login failed: ", result.payload);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardContent>
                    <div className="flex self-center justify-center mb-8">
                        <Logo />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-6">
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        type="username"
                                        placeholder="Input username"
                                        {...register("username")}
                                        disabled={loading}
                                    />
                                    {errors.username && (
                                        <p className="text-red-600 text-sm">{errors.username.message}</p>
                                    )}
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Input password"
                                        {...register("password")}
                                        disabled={loading}
                                    />
                                    {errors.password && (
                                        <p className="text-red-600 text-sm">{errors.password.message}</p>
                                    )}
                                </div>

                                {error && (
                                    <p className="text-red-600 text-sm font-medium">
                                        {getErrorMessage(error)}
                                    </p>
                                )}

                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? "Logging in..." : "Login"}
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
