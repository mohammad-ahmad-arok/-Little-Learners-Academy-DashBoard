import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateAward= createAsyncThunk(
  "awards/update",
  async (info: { id: string; data: any }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(`/api/awards/${info.id}`, info.data);
      return res.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Error");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export default updateAward;
