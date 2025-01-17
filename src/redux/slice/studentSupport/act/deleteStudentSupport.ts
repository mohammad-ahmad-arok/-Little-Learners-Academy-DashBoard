import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteStudentSupport = createAsyncThunk(
    "StudentSupport/delete",
    async (id:string, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.delete(
          `/api/student-support/${id}`,
        );
        console.log(res.data)
  
        return id;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );
  export default deleteStudentSupport