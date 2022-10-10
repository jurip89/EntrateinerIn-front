import { URL } from './../../utils';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const talentsThunk = createAsyncThunk('talents/getTalents', async () => {
    try {
        const res = await axios.get(`${URL}/talents`)
    return  res.data
    } catch (error) {
        console.log(error)
    }
})


export const getOneTalentThunk = createAsyncThunk('talents/getOne', async (id: string | undefined) => {
    try {
        const res = await axios.get(`${URL}/talents/${id}`);
        return res.data
    } catch (error) {
        console.log(error)
    }
})