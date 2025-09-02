import { UserProfileResponse } from "./userProfileResponse";

export interface LoginResponse {
    token: string;
    user?: UserProfileResponse;
}