import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addStudentSupport = createAsyncThunk(
    "StudentSupport/add",
    async (data:any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.post(
          "/api/student-support",data
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

  export default addStudentSupport