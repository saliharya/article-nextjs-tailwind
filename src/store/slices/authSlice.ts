import { login, register } from "@/api/auth/AuthApi";
import { LoginRequest } from "@/api/auth/request/loginRequest";
import { RegisterRequest } from "@/api/auth/request/registerRequest";
import { LoginResponse } from "@/api/auth/response/loginResponse";
import { RegisterResponse } from "@/api/auth/response/registerResponse";
import { UserProfileResponse } from "@/api/auth/response/userProfileResponse";
import { apiClient } from "@/api/client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../states/auth/authState";

const initialState: AuthState = {
    user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null,
    token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk<LoginResponse, LoginRequest>(
    "auth/loginUser",
    async (data, { rejectWithValue }) => {
        try {
            const res = await login(data);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Login failed");
        }
    }
);

export const registerUser = createAsyncThunk<RegisterResponse, RegisterRequest>(
    "auth/registerUser",
    async (data, { rejectWithValue }) => {
        try {
            const res = await register(data);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Register failed");
        }
    }
);

export const fetchProfile = createAsyncThunk<UserProfileResponse>(
    "auth/fetchProfile",
    async (_, { getState, rejectWithValue }) => {
        const state = getState() as { authReducer: AuthState };
        const token = state.authReducer.token || localStorage.getItem("token");

        try {
            const res = await apiClient.get<UserProfileResponse>("/auth/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Failed to fetch profile");
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
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
        setUser: (state, action: PayloadAction<UserProfileResponse>) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
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
                if ((action.payload as any).user) {
                    state.user = (action.payload as any).user;
                    localStorage.setItem("user", JSON.stringify((action.payload as any).user));
                }
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<UserProfileResponse>) => {
                state.user = action.payload
                localStorage.setItem('user', JSON.stringify(action.payload))
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;