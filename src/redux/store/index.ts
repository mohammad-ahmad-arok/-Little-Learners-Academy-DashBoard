import { configureStore } from "@reduxjs/toolkit";

// Slices
import faqs from "../slice/faqSlice"
import testimonialSlice from "../slice/testimonials/testimonialSlice"
import missionVision from "../slice/mission-vision/missionVisionSlice"
import memberSlice from "../slice/members/memberSlice"

export const store=configureStore({reducer:{testimonialSlice,faqs,missionVision,memberSlice}})




// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch