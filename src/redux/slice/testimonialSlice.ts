import {  createSlice } from "@reduxjs/toolkit";


// Thunks 
import getAllTestimonials from "./act/getAllTestimonials";
import addTestimonail from "./act/addTestimonial";
import updateTestimonial from "./act/updateTestimonial";
import deleteTestimonial from "./act/deleteTestimonial";

// Types
export interface TTestimonial {
  _id?: string;
  name: string;
  image?: {url:string,public_id:string};
  description: string;
  evaluation?: number;
}

type TState = {
  testimonials: TTestimonial[];
  isLoading: "Idle" | "Pending" | "Fail" | "Success";
  error: string | null;
};

// State
const initialState: TState = {
  testimonials: [],
  isLoading: "Idle",
  error: null,
};




// Slice
const testimonialSlice = createSlice({
  name: "testimonial",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTestimonials.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getAllTestimonials.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.testimonials = action.payload;
    });
    builder.addCase(getAllTestimonials.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(addTestimonail.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(addTestimonail.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.testimonials.push(action.payload);
    });
    builder.addCase(addTestimonail.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(updateTestimonial.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(updateTestimonial.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.testimonials = state.testimonials.map((testimonial) =>
        testimonial._id === action.payload._id ? action.payload : testimonial
      );
    });
    builder.addCase(updateTestimonial.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
    builder.addCase(deleteTestimonial.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(deleteTestimonial.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.testimonials=state.testimonials.filter((item)=>item._id!==action.payload);
    });
    builder.addCase(deleteTestimonial.rejected, (state,action) => {
      state.isLoading = "Fail";
      state.error = action.payload as string;
    });
  }
});

export default testimonialSlice.reducer;

export { getAllTestimonials,addTestimonail,updateTestimonial,deleteTestimonial };
