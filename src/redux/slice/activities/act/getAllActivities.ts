import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllActivities = createAsyncThunk(
    "activities/all",
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.get(
          "/api/activities"
        );

        console.log(res.data.data)
  
        return res.data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default getAllActivities