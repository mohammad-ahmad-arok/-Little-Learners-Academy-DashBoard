import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllTestimonials = createAsyncThunk(
    "testimonials/all",
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.get(
          "/api/testimonials"
        );
  
        return res.data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default getAllTestimonials