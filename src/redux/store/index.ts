import { configureStore } from "@reduxjs/toolkit";
import histories from "../slice/historySlice";
import faqs from "../slice/faqSlice"
import benefits from "../slice/benefitsSlice";

export const store=configureStore({reducer:{faqs,histories,benefits}})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch