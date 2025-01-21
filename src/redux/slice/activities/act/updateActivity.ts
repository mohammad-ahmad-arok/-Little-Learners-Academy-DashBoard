import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateActivity = createAsyncThunk(
  "activities/update",
  async (info: { id: string; data: any }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(`/api/activities/${info.id}`, info.data);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Error");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export default updateActivity;
