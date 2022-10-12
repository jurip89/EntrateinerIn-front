import { URL } from "./../../utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { deleteImg } from "./slice";

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
