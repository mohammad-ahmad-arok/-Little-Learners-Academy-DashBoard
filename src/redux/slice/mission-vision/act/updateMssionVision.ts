import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateMssionVision = createAsyncThunk(
    "mission-vision/update",
    async (info:{title:string,data:any}, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.put(
          `/api/mission-vision/${info.title}`,info.data
        );
        console.log(res.data);
        return res.data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default updateMssionVision