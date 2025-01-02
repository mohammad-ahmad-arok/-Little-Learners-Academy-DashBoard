import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteMissionVision = createAsyncThunk(
    "mission-vision/delete",
    async (title:string, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.delete(
          `/api/mission-vision/${title}`,
        );
        
        console.log(res.data)
  
        return title;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export default deleteMissionVision