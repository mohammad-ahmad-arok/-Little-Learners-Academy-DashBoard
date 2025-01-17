import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch FAQs
export const fetchFAQs = createAsyncThunk("faqs/fetchFAQs", async () => {
  const response = await axios.get("/api/commonquestions");
  return response.data.data;
});

// Add 
export const createFAQ = createAsyncThunk(
  "faqs/createFAQ",
  async (faq: { question: string; answer: string }) => {
    const response = await axios.post("/api/commonquestions", faq);
    console.log(response.data.data)
    return response.data.data;
  }
);

// Update
export const editFAQ = createAsyncThunk(
  "faqs/editFAQ",
  async ({ id, faq }: { id: string; faq: { question: string; answer: string } }) => {
    const response = await axios.put(`/api/commonquestions/${id}`, faq);
    return response.data.data;
  }
);

export const removeFAQ = createAsyncThunk("faqs/removeFAQ", async (id: string) => {
  await axios.delete(`/api/commonquestions/${id}`);
  return id;
});
