import { configureStore } from "@reduxjs/toolkit";

// Slices
import faqs from "../slice/faqSlice"
import testimonialSlice from "../slice/testimonials/testimonialSlice"
import missionVision from "../slice/mission-vision/missionVisionSlice"
import memberSlice from "../slice/members/memberSlice"
import histories from "../slice/historySlice";
import benefits from "../slice/benefitsSlice";
import specialFeaturesReducer from "../../redux/slice/specialFeaturesSlice"; 



export const store = configureStore({
    reducer: {
      testimonialSlice,
      faqs,
      missionVision,
      memberSlice,
      histories,
      benefits,
      specialFeatures: specialFeaturesReducer, 
    },
  });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch