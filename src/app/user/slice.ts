import { createSlice } from "@reduxjs/toolkit";
import { signUp, login, getUserWithStoredToken } from "./thunks";
const initialState = {
  token: localStorage.getItem("token"),
  profile: null,
  isLoading: false,
  isError: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.profile = action.payload.user;
    },
    logOut: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.profile = null;
    },
    tokenStillValid: (state, action) => {
      state.profile = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.profile = action.payload.user;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.profile = action.payload.user;
    });
    builder.addCase(login.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(getUserWithStoredToken.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserWithStoredToken.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
        state.profile = action.payload;
    });
    builder.addCase(getUserWithStoredToken.rejected, (state) => {
      state.isError = true;
      localStorage.removeItem("token");
      state.token = null;
      state.profile = null;
    });
  },
});

export const { loginSuccess, logOut, tokenStillValid } = userSlice.actions;

export default userSlice.reducer;
