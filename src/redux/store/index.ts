import { configureStore } from "@reduxjs/toolkit";

// Slices
import faqs from "../slice/Faq/faqSlice";
import testimonialSlice from "../slice/testimonials/testimonialSlice";
import admissionProcessSlice from "../slice/admissionProcess/admissionProcessSlice";
import missionVision from "../slice/mission-vision/missionVisionSlice";
import memberSlice from "../slice/members/memberSlice";
import histories from "../slice/historySlice";
import benefits from "../slice/benefitsSlice";
import specialFeaturesReducer from "../../redux/slice/specialFeaturesSlice";
import subjectSlice from "../slice/subjects/subjectSlice";
import activitySlice from "../slice/activities/activitySlice";
import messageReducer from "../slice/messageSlice";
import feeStructures from "../slice/feeStructureSlice";
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
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
