import { UserProfileResponse } from "@/api/auth/response/userProfileResponse";

export interface AuthState {
    user: UserProfileResponse | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}