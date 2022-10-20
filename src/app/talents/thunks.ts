import { URL } from "./../../utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const talentsThunk = createAsyncThunk("talents/getTalents", async () => {
  try {
    const res = await axios.get(`${URL}/talents`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const getOneTalentThunk = createAsyncThunk(
  "talents/getOne",
  async (id: string | undefined) => {
    try {
      const res = await axios.get(`${URL}/talents/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteImage = createAsyncThunk(
  "talents/deleteImage",
  async (id: number | undefined) => {
    const token: string | null = localStorage.getItem("token");
    try {
      if (!token) return;
      await axios.delete(`${URL}/images/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return id;
    } catch (error) {
      console.log(error);
    }
  }
);
export const applyForJob = createAsyncThunk(
  "talents/apply",
  async (application) => {
    try {
      const res = await axios.post(`${URL}/apply`, application);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

type Review = {
  title: string;
  comment: string;
  rating: string;
  receiverId: number;
};

export const addReview = createAsyncThunk(
  `talent/review`,
  async (review: Review) => {
    try {
      const token: string | null = localStorage.getItem("token");
      const res = await axios.post(`${URL}/reviews`, review, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

type Image = {
  source: string;
  userId: string | number | undefined;
};

type Profile = {
  name: string;
  email: string;
  intro: string;
  isRecruiter: boolean;
};

type Role = {
  yearsOfExperience: string;
  userId: string | number | undefined;
  roleId: string | number;
};

type Body = {
  profile: Profile;
  image: Image;
  role: Role;
};

export const editProfile = createAsyncThunk(
  "talent/edit",
  async (body: Body) => {
    try {
      const resProfile = await axios.patch(`${URL}/talents`, body.profile);
      const resImage = await axios.post(`${URL}/images`, body.image);
      const resRole = await axios.post(`${URL}/roles`, body.role);
      return {
        profile: resProfile.data,
        image: resImage.data,
        role: resRole.data,
      };
    } catch (error) {
      console.log(error);
    }
  }
);
