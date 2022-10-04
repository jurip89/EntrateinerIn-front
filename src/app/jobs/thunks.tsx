import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../utils";

export const getJobsThunk = createAsyncThunk("jobs/getJobs", async () => {
  try {
    const res = await axios.get(`${URL}/jobs`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
});
