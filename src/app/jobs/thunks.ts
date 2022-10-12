import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { URL, MAP_BOX_KEY } from "../../utils";

type Job = {
  title: string;
  description: string;
  duration: string;
  paid: boolean;
  amount: number | null | string;
  location: string;
  userId: number | string | undefined;
  categoryId: string | number;
};

export const getJobsThunk = createAsyncThunk("jobs/getJobs", async () => {
  try {
    const res = await axios.get(`${URL}/jobs`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
});

export const getSingleJob = createAsyncThunk(
  "jobs/getAJob",
  async (id: string | undefined) => {
    try {
      const res = await axios.get(`${URL}/jobs/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createJob = createAsyncThunk("jobs/create", async (job: Job) => {
  try {
    const { location } = job;
    const token = localStorage.getItem("token");

    const geoLocation = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${MAP_BOX_KEY}`
    );
    const [lng, lat] = geoLocation.data.features[0].geometry.coordinates;
    const completeJob = { lat, lng, ...job, categoryId: 1 };
    const newJob = await axios.post(`${URL}/jobs`, completeJob, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return newJob.data;
  } catch (error) {
    console.log(error);
  }
});
