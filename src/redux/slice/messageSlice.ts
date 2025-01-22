import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://little-learners-academy-back-end-j3iu.onrender.com/api/message";

// Define the shape of your state
type MessageState = {
  messages: any[];
  selectedMessage: any | null;
  loadingStatus: "Idle" | "Pending" | "Fail" | "Success";
  error: string | null;
};

// Initial state
const initialState: MessageState = {
  messages: [],
  selectedMessage: null,
  loadingStatus: "Idle",
  error: null,
};

export const fetchMessages = createAsyncThunk("messages/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get(API_URL);
    console.log("API Response:", response.data); // Debugging line
    return Array.isArray(response.data) ? response.data : []; // Ensure it's always an array
  } catch (error) {
    return thunkAPI.rejectWithValue(
      axios.isAxiosError(error) ? error.response?.data?.message || "Failed to fetch messages" : "An error occurred"
    );
  }
});


// Thunk for fetching a single message
export const fetchMessageById = createAsyncThunk("messages/fetchById", async (id: string, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch the message");
  }
});

// **Thunk for deleting a message**
export const deleteMessage = createAsyncThunk("messages/delete", async (id: string, thunkAPI) => {
  try {
    // @ts-ignore */}
    const response = await axios.delete(`${API_URL}/${id}`);
    return id; // Return the deleted message ID to remove it from the state
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete the message");
  }
});

// Message slice
const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all messages
      .addCase(fetchMessages.pending, (state) => {
        state.loadingStatus = "Pending";
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loadingStatus = "Success";
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loadingStatus = "Fail";
        state.error = action.payload as string;
      })
      // Fetch a single message
      .addCase(fetchMessageById.pending, (state) => {
        state.loadingStatus = "Pending";
        state.error = null;
      })
      .addCase(fetchMessageById.fulfilled, (state, action) => {
        state.loadingStatus = "Success";
        state.selectedMessage = action.payload;
      })
      .addCase(fetchMessageById.rejected, (state, action) => {
        state.loadingStatus = "Fail";
        state.error = action.payload as string;
      })
     
      // **Delete a message**
      .addCase(deleteMessage.pending, (state) => {
        state.loadingStatus = "Pending";
        state.error = null;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.loadingStatus = "Success";
        state.messages = state.messages.filter((msg) => msg._id !== action.payload); // Remove the deleted message
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.loadingStatus = "Fail";
        state.error = action.payload as string;
      });
  },
});

export default messageSlice.reducer;
