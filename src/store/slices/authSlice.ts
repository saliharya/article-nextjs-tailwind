import { login, register } from "@/api/auth/AuthApi";
import { LoginRequest } from "@/api/auth/request/loginRequest";
import { RegisterRequest } from "@/api/auth/request/registerRequest";
import { LoginResponse } from "@/api/auth/response/loginResponse";
import { RegisterResponse } from "@/api/auth/response/registerResponse";
import { UserProfileResponse } from "@/api/auth/response/userProfileResponse";
import { apiClient } from "@/api/client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../states/auth/authState";
import Cookies from "js-cookie";
import { getErrorMessage } from "@/utils/getErrorMessage";

const initialState: AuthState = {
    user: typeof window !== "undefined" ? JSON.parse(Cookies.get("user") || "null") : null,
    token: typeof window !== "undefined" ? Cookies.get("token") || null : null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk<LoginResponse, LoginRequest, { rejectValue: string }>(
    "auth/loginUser",
    async (data, { rejectWithValue }) => {
        try {
            const res = await login(data);
            return res;
        } catch (err: unknown) {
            return rejectWithValue(getErrorMessage(err));
        }
    }
);

export const registerUser = createAsyncThunk<RegisterResponse, RegisterRequest, { rejectValue: string }>(
    "auth/registerUser",
    async (data, { rejectWithValue }) => {
        try {
            const res = await register(data);
            return res;
        } catch (err: unknown) {
            return rejectWithValue(getErrorMessage(err));
        }
    }
);

export const fetchProfile = createAsyncThunk<UserProfileResponse>(
    "auth/fetchProfile",
    async (_, { rejectWithValue }) => {
        try {
            const token = Cookies.get("token");
            const res = await apiClient.get<UserProfileResponse>("/auth/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (err: unknown) {
            return rejectWithValue(getErrorMessage(err));
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            Cookies.remove("token");
            Cookies.remove("user");
        },
        setUser: (state, action: PayloadAction<UserProfileResponse>) => {
            state.user = action.payload;
            Cookies.set("user", JSON.stringify(action.payload));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.loading = false;
                state.token = action.payload.token;
                Cookies.set("token", action.payload.token);
                if (action.payload.user) {
                    state.user = action.payload.user;
                    Cookies.set("user", JSON.stringify(action.payload.user));
                }
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload as string || "Login failed";
            })
            .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<UserProfileResponse>) => {
                state.user = action.payload;
                Cookies.set("user", JSON.stringify(action.payload));
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload as string || "Register failed";
            })
    },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;