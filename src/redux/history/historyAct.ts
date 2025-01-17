import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://little-learners-academy-back-end-j3iu.onrender.com/api/history";

export const fetchHistories = createAsyncThunk("histories/fetchHistories", async () => {
  const response = await axios.get(BASE_URL);
  return response.data.data; 
});

export const createHistory = createAsyncThunk(
  "histories/createHistory",
  async (history: { year: number; title: string; description: string }) => {
    const response = await axios.post(BASE_URL, history);
    console.log("Created History:", response.data); 
    return response.data.data; 
  }
);



export const editHistory = createAsyncThunk(
  "histories/editHistory",
  async ({ id, history }: { id: string; history: { year: number; title: string; description: string } }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, history);
    return response.data.data; 
  }
);


export const removeHistory = createAsyncThunk("histories/removeHistory", async (id: string) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
});