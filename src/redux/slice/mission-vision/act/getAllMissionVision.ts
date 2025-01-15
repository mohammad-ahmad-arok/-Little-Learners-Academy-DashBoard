import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllMissionVision = createAsyncThunk(
    "mission-vision/all",
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.get(
          "/api/mission-vision"
        );

  
        return res.data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default getAllMissionVision