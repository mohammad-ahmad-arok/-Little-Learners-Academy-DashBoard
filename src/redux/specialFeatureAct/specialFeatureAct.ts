import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "/api/specialfeatures";

// Fetch all special features
export const fetchSpecialFeatures = createAsyncThunk("specialFeatures/fetch", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

// Add a new special feature
export const addSpecialFeature = createAsyncThunk("specialFeatures/add", async (formData: FormData) => {
  const response = await axios.post(BASE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
});

// Edit a special feature
export const editSpecialFeature = createAsyncThunk(
  "specialFeatures/edit",
  async ({ id, specialFeature }: { id: string; specialFeature: FormData }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, specialFeature, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
);

// Remove a special feature
export const removeSpecialFeature = createAsyncThunk(
  "specialFeatures/remove",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return id; // Return the id to filter it out from the state
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete special feature.");
    }
  }
);
