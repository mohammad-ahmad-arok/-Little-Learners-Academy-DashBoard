import { configureStore } from "@reduxjs/toolkit";

// Slices
import faqs from "../slice/faqSlice"
import testimonialSlice from "../slice/testimonialSlice"
import missionVision from "../slice/missionVisionSlice"

export const store=configureStore({reducer:{testimonialSlice,faqs,missionVision}})




// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch