import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch FAQs
export const fetchFAQs = createAsyncThunk("faqs/fetchFAQs", async () => {
  const response = await axios.get("https://little-learners-academy-back-end-j3iu.onrender.com/api/commonquestions");
  return response.data;
});

// Add 
export const createFAQ = createAsyncThunk(
  "faqs/createFAQ",
  async (faq: { question: string; answer: string }) => {
    const response = await axios.post("https://little-learners-academy-back-end-j3iu.onrender.com/api/commonquestions", faq);
    return response.data;
  }
);

// Update
export const editFAQ = createAsyncThunk(
  "faqs/editFAQ",
  async ({ id, faq }: { id: string; faq: { question: string; answer: string } }) => {
    const response = await axios.put(`https://little-learners-academy-back-end-j3iu.onrender.com/api/commonquestions/${id}`, faq);
    return response.data;
  }
);

export const removeFAQ = createAsyncThunk("faqs/removeFAQ", async (id: string) => {
  await axios.delete(`https://little-learners-academy-back-end-j3iu.onrender.com/api/commonquestions/${id}`);
  return id;
});
