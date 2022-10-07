import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getJobsThunk, getSingleJob } from "./thunks";

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
    email: string;
    name: string;
  };
  role: { name: string };
  jobLocations: {
    lat: number;
    lon: number;
  };
};

type InitialState = {
  jobs: Job[] | [];
  job: Job | {};
  isLoading: boolean;
  isError: boolean;
};

const initialState: InitialState = {
  jobs: [],
  job: {},
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
    builder.addCase(getJobsThunk.rejected, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSingleJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getSingleJob.fulfilled,
      (state, action: PayloadAction<Job>) => {
        state.isLoading = false;
        state.job = action.payload;
      }
    );
    builder.addCase(getSingleJob.rejected, state => {
      state.isError = true;
    })
  },
});

export const {} = jobsSlice.actions;

export default jobsSlice.reducer;
