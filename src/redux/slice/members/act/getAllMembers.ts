import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllMembers = createAsyncThunk(
    "members/all",
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.get(
          "/api/team-members"
        );
  

        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default getAllMembers