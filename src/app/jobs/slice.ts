import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getJobsThunk } from "./thunks";

type Job = {
  id: number;
  title: string;
  description: string;
  duration: string;
  paid: boolean;
  amount: number | null;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    email: string;
    name: string;
  };
};

type InitialState = {
  jobs: Job[] | [];
  isLoading: boolean;
  isError: boolean;
};

const initialState: InitialState = {
  jobs: [],
  isLoading: false,
  isError: false,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getJobsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getJobsThunk.fulfilled,
      (state, action: PayloadAction<Job[]>) => {
        state.isLoading = false;
        state.jobs = action.payload;
      }
    );
  },
});

export const {} = jobsSlice.actions;

export default jobsSlice.reducer;
