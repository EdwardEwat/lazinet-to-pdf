import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = process.env.REACT_APP_BASE_URL;

export const LoginApp = createAsyncThunk(
  "auth/Login",
  async ({ email, password }) => {
    try {
      const params = {
        email: email,
        password: password,
        Origin: "https://hathyo.com",
      };
      const response = await fetch(`${API_BASE}/auth/api/v1/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server Error:", errorData);
        throw new Error(errorData.message || "Internal Server Error");
      }

      const data = await response.json();
      return data.accessToken;
    } catch (error) {
      console.error("Unexpected Error:", error);
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginApp.fulfilled, (state, action) => {
      state.token = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
