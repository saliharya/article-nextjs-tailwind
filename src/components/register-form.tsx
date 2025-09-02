"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { registerUser } from "@/store/slices/authSlice"
import Logo from "./logo"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { getErrorMessage } from "@/utils/getErrorMessage"

const roles = ["User", "Admin"] as const;

const schema = z.object({
    username: z.string().nonempty("Please enter your username"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["User", "Admin"] as const).refine(val => val === "User" || val === "Admin", {
        message: "Please select a role",
    }),
});

type RegisterFormInputs = z.infer<typeof schema>;

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const { loading, error } = useAppSelector((state) => state.authReducer);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<RegisterFormInputs>({
        resolver: zodResolver(schema),
        defaultValues: {
            role: "User",
        },
    });

    const onSubmit = async (data: RegisterFormInputs) => {
        const resultAction = await dispatch(registerUser(data));
        if (registerUser.fulfilled.match(resultAction)) {
            router.push('/login');
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

                                <div className="grid gap-3">
                                    <Label htmlFor="role">Role</Label>
                                    <Controller
                                        control={control}
                                        name="role"
                                        render={({ field }) => (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button
                                                        type="button"
                                                        className="w-full rounded-md border px-3 py-2 text-left text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                                    >
                                                        {field.value}
                                                    </button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent className="w-full">
                                                    {roles.map((r) => (
                                                        <DropdownMenuItem
                                                            key={r}
                                                            onSelect={() => field.onChange(r)}
                                                        >
                                                            {r}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                    />
                                    {errors.role && (
                                        <p className="text-red-600 text-sm">{errors.role.message}</p>
                                    )}
                                </div>

                                {error && (
                                    <p className="text-red-600 text-sm font-medium">{getErrorMessage(error)}</p>
                                )}

                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? "Registering..." : "Register"}
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
