import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateEvent = createAsyncThunk(
    "events/update",
    async (info:{id:string,data:any}, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.put(
          `/api/events/${info.id}`,info.data
        );
        return res.data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default updateEvent