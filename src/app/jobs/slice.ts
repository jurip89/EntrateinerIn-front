import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  getJobsThunk,
  getSingleJob,
  createJob,
  getMyJobsRecruiter,
  deleteJob,
  updateJob,
  getMyJobDetailRecruiter,
} from "./thunks";

type Applicant = {
  applicants: { status: string };

  id: number;
  name: string;
  profilePic: string;
};

type Job = {
  id: string;
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
    profilePic: string;
  };
  role: { name: string; id: string };

  lat?: number;
  lng?: number;
  applicantsJob: Applicant[];
};

type InitialState = {
  jobs: Job[] | [];
  job: Job | undefined;
  isLoading: boolean;
  isError: boolean;
};

const initialState: InitialState = {
  jobs: [],
  job: undefined,
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
        state.job = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(getSingleJob.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(getMyJobsRecruiter.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getMyJobsRecruiter.fulfilled, (state, action) => {
      state.isError = false;
      state.jobs = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getMyJobsRecruiter.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(getMyJobDetailRecruiter.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getMyJobDetailRecruiter.fulfilled, (state, action) => {
      state.job = action.payload;
      state.isError = false;
      state.isLoading = false;
    });
    builder.addCase(getMyJobDetailRecruiter.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(createJob.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(createJob.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.job = action.payload;
      console.log(action.payload);
      state.jobs = [action.payload, ...state.jobs];
    });
    builder.addCase(createJob.rejected, (state) => {
      state.isError = true;
    });
    builder.addCase(deleteJob.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(deleteJob.fulfilled, (state, action) => {
      const newJobs = [...state.jobs].filter((el) => el.id !== action.payload);
      state.isError = false;
      state.isLoading = false;
      state.jobs = newJobs;
    });
    builder.addCase(updateJob.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(updateJob.fulfilled, (state, action) => {
      const newState = [...state.jobs].filter(
        (el) => el.id !== action.payload.id
      );
      state.jobs = [action.payload, ...newState];
      state.isError = false;
      state.isLoading = false;
    });
    builder.addCase(updateJob.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

//export const {} = jobsSlice.actions;

export default jobsSlice.reducer;
