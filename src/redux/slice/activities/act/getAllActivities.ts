import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllActivities = createAsyncThunk(
  "activities/all",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get("/api/activities");
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Error");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export default getAllActivities;
