import { z } from "zod"

export const registerSchema = z.object({
    username: z.string().min(1, "Username cannot be empty"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    role: z.enum(["User", "Admin"], {
        message: "Please select a role",
    }),
})

export type RegisterSchema = z.infer<typeof registerSchema>