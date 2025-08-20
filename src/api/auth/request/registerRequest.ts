export interface RegisterRequest {
    username: string;
    password: string;
    role: "User" | "Admin";
}