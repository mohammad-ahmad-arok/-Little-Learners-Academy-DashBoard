import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addActivity = createAsyncThunk(
  "activities/add",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post("/api/activities", data);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Error");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export default addActivity;
