import { apiClient } from "../client";
import { LoginRequest } from "./request/loginRequest";
import { RegisterRequest } from "./request/registerRequest";
import { LoginResponse } from "./response/loginResponse";
import { RegisterResponse } from "./response/registerResponse";
import { UserProfileResponse } from "./response/userProfileResponse";


export async function login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>("/auth/login", data);
    return response.data;
}

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const res = await apiClient.post<RegisterResponse>("/auth/register", data);
    return res.data;
};

export const getProfile = async (): Promise<UserProfileResponse> => {
    const res = await apiClient.get<UserProfileResponse>("/auth/profile");
    return res.data;
};