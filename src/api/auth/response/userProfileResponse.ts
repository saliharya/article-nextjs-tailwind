export interface UserProfileResponse {
    id: string;
    username: string;
    role: "user" | "admin";
}