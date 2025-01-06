import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://little-learners-academy-back-end-j3iu.onrender.com/api/benefits";

// Fetch all benefits
export const fetchBenefits = createAsyncThunk("benefits/fetchBenefits", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Create a new benefit
export const createBenefit = createAsyncThunk("benefits/createBenefit", async (formData: FormData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
});

// Edit a benefit
export const editBenefit = createAsyncThunk(
  "benefits/editBenefit",
  async ({ id, formData }: { id: string; formData: FormData }) => {
    const response = await axios.put(`${API_URL}/${id}`, formData);
    return response.data;
  }
);

// Delete a benefit
export const removeBenefit = createAsyncThunk("benefits/removeBenefit", async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});
