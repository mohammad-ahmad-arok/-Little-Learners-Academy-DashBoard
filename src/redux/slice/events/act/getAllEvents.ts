import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllEvents = createAsyncThunk(
    "events/all",
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.get(
          "/api/events"
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

  export default getAllEvents