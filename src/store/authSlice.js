import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthCheck: false,
    isAuthenticated: false,
    role: null,
    user: null,
  },
  reducers: {
    login(state, data) {
      state.isAuthCheck = true;
      state.isAuthenticated = data.payload.status;
      if (data.payload.status) {
        state.role = data.payload.user.role;
        state.user = data.payload.user;
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = null;
      state.user = null;
      localStorage.removeItem("admin_token");
    },
  },
});

export const { login: loginAction, logout: logoutAction } = authSlice.actions;

export default authSlice.reducer;
