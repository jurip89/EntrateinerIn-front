import { useAppSelector } from './../hooks';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from "../../utils";
import axios from "axios";


import { loginSuccess, logOut, tokenStillValid } from "./slice";

type User = {
    name: string;
    email: string;
    password: string ;
}

type LogInUser = {
    email: string;
    password: string;
}


export const signUp = createAsyncThunk('auth/signUp', async (user: User) => {
    try {
        const response = await axios.post(`${URL}/auth/signup`, user);
        console.log(response)
        return response.data
    } catch (e) {
        console.log(e)
    }
});
    

     

export const login = createAsyncThunk('auth/login',async(user:LogInUser) => {
  
    try {
        const response = await axios.post(`${URL}/auth/login`, user)
        console.log(response.data)
        return response.data
        
    }catch(e){console.log(e)}
      
      } )

export const getUserWithStoredToken = createAsyncThunk('auth/me', async () => {
    const token = localStorage.getItem('token')
    console.log(token)
    // if we have no token, stop
    if (token === null) return;
    try {
        const response = await axios.get(`${URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
})