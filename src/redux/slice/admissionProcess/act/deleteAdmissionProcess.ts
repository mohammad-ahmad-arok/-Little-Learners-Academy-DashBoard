import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteAdmissionProcess = createAsyncThunk(
  "admissionProcess/delete",
  async (id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(`/api/admission-process/${id}`);
      return id; // Access response.data.data if needed
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export default deleteAdmissionProcess;
