export interface RegisterResponse {
    username: string;
    password: string;
    role: "User" | "Admin";
    createdAt: string;
    updatedAt: string;
}