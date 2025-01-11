import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addEvent = createAsyncThunk(
    "events/add",
    async (data:any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.post(
          "/api/events",data
        );
  
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default addEvent