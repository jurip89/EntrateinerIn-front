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

export const getSingleJob = createAsyncThunk('jobs/getAJob', async (id:string | undefined) => {
  try {
    const res = await axios.get(`${URL}/jobs/${id}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
})
