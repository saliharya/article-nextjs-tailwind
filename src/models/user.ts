export interface User {
    id: string;
    username: string;
    role: "User" | "Admin";
}