import { PayloadAction } from "@reduxjs/toolkit";
import { Action } from "@reduxjs/toolkit";
import { talentsThunk } from "./thunks";
import { createSlice } from "@reduxjs/toolkit";

type Image = {
  id: number;
  source: string;
};

type User = {
  name: string;
  profilePic: string;
};

type Review = {
  title: string;
  id: number;
  upddatedAt: Date;
  user: User;
};

type Talet = {
  name: string;
  email: string;
  images: Image[] | [];
  id: number;
  intro: string;
  profilePic: string;
  reviews: Review[];
};

type InitialStateObj = {
  talents: Talet[] | [];
  talent: Talet | null;
  isLoading: boolean;
  isError: boolean;
};

const initialState: InitialStateObj = {
  talents: [],
  talent: null,
  isLoading: false,
  isError: false,
};

export const talentSlice = createSlice({
  name: "talents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(talentsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      talentsThunk.fulfilled,
      (state, action: PayloadAction<Talet[]>) => {
        state.isLoading = false;
        state.talents = action.payload;
      }
    );
    builder.addCase(talentsThunk.rejected, (state) => {
      state.isError = true;
    });
  },
});

export const {} = talentSlice.actions;
export default talentSlice.reducer;
