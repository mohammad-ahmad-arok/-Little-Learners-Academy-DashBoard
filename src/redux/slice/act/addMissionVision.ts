import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addMissionVision = createAsyncThunk(
    "mission-vision/add",
    async (data:any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.post(
          "/api/mission-vision",data
        );
        console.log(res.data)
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default addMissionVision