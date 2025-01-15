import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addActivity = createAsyncThunk(
    "activities/add",
    async (data:any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.post(
          "/api/activities",data
        );
         console.log(res.data)
        return res.data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default addActivity