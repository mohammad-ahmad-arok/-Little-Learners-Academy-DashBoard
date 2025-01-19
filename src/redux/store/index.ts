import { configureStore } from "@reduxjs/toolkit";

// Slices
import faqs from "../slice/Faq/faqSlice";
import testimonialSlice from "../slice/testimonials/testimonialSlice";
import missionVision from "../slice/mission-vision/missionVisionSlice";
import memberSlice from "../slice/members/memberSlice";
import histories from "../slice/historySlice";
import benefits from "../slice/benefitsSlice";
import specialFeaturesReducer from "../../redux/slice/specialFeaturesSlice";
import subjectSlice from "../slice/subjects/subjectSlice"; 
import messageReducer from "../slice/messageSlice";
import feeStructures from "../slice/feeStructureSlice";
import admissionProcessReducer from "../slice/admissionProcess/admissionProcessSlice";
import activityReducer from "../slice/activities/activitySlice";  

export const store = configureStore({
  reducer: {
    testimonialSlice,
    faqs,
    missionVision,
    memberSlice,
    histories,
    benefits,
    specialFeatures: specialFeaturesReducer,
    feeStructures,
    messages: messageReducer, 
    admissionProcessSlice: admissionProcessReducer,
    activitySlice: activityReducer,
    subjectSlice, 
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
