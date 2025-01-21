import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addSubject = createAsyncThunk(
    "subjects/add",
    async (data:any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.post(
          "/api/subjects",data
        );
  
        return res.data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default addSubject