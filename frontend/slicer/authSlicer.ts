import { authService, type AuthUser } from "@/services/auth.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  initialized: boolean;
}

export const checkAuth = createAsyncThunk(
  "auth/check",
   async () => {
  const res = await authService.getMe();
  return res;
});

const initialState: AuthState = {
  user: null,
  loading: false,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut(state) {
      state.user = null;
      state.loading = false;
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.initialized = true;
        state.user = null;
      });
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
