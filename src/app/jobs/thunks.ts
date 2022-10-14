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
type JobToUpdate = {
  id: string |undefined;
  title: string;
  description: string;
  duration: string;
  paid: boolean;
  amount: string | number;
  location: string;
  categoryId: number |string;
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

export const getMyJobsRecruiter = createAsyncThunk(
  "jobs/getMyJobsRecruiter",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${URL}/jobs/myjobs/recruiter`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    const completedJob = { lat, lng, ...job };
    const newJob = await axios.post(`${URL}/jobs`, completedJob, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return newJob.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteJob = createAsyncThunk('jobs/delete', async (id: string) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${URL}/jobs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return id
  } catch (error) {
    console.log(error)
  }
});
export const updateJob = createAsyncThunk('jobs/update', async (job:JobToUpdate ) => {
  try {
    const { location } = job;
    const token = localStorage.getItem("token");
    
    const geoLocation = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${MAP_BOX_KEY}`
    );
    const [lng, lat] = geoLocation.data.features[0].geometry.coordinates;
    const completedJob = { lat, lng, ...job };
    const res = await axios.patch(`${URL}/jobs/${job.id}`,completedJob,{
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
})
