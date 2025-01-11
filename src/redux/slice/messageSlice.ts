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

// Thunk for fetching all messages
export const fetchMessages = createAsyncThunk("messages/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch messages");
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

// Thunk for creating a new message
export const createMessage = createAsyncThunk("messages/create", async (messageData: any, thunkAPI) => {
  try {
    const response = await axios.post(API_URL, messageData);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create the message");
  }
});

// Thunk for editing a message
export const editMessage = createAsyncThunk("messages/edit", async ({ id, newMessage }: { id: string; newMessage: any }, thunkAPI) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, newMessage);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update the message");
  }
});

// **Thunk for deleting a message**
export const deleteMessage = createAsyncThunk("messages/delete", async (id: string, thunkAPI) => {
  try {
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
      // Create a new message
      .addCase(createMessage.pending, (state) => {
        state.loadingStatus = "Pending";
        state.error = null;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.loadingStatus = "Success";
        state.messages.push(action.payload);
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.loadingStatus = "Fail";
        state.error = action.payload as string;
      })
      // Edit a message
      .addCase(editMessage.pending, (state) => {
        state.loadingStatus = "Pending";
        state.error = null;
      })
      .addCase(editMessage.fulfilled, (state, action) => {
        state.loadingStatus = "Success";
        const index = state.messages.findIndex((msg) => msg._id === action.payload._id);
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
      })
      .addCase(editMessage.rejected, (state, action) => {
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
