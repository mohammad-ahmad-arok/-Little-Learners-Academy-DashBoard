import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSpecialFeatures,
  addSpecialFeature,
  editSpecialFeature,
  removeSpecialFeature,
} from "../specialFeatureAct/specialFeatureAct";

interface SpecialFeature {
  _id: string;
  name: string;
  description: string;
  icon: string;
}

interface SpecialFeatureState {
  specialFeatures: SpecialFeature[];
  loading: boolean;
  error: string | null;
}

const initialState: SpecialFeatureState = {
  specialFeatures: [],
  loading: false,
  error: null,
};

const specialFeaturesSlice = createSlice({
  name: "specialFeatures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialFeatures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecialFeatures.fulfilled, (state, action) => {
        state.loading = false;
        state.specialFeatures = action.payload || [];
      })
      .addCase(fetchSpecialFeatures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch special features.";
      })
      .addCase(addSpecialFeature.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          state.specialFeatures.push(action.payload);
        }
      })
      .addCase(editSpecialFeature.fulfilled, (state, action) => {
        state.specialFeatures = state.specialFeatures.map((feature) =>
          feature._id === action.payload._id ? action.payload : feature
        );
      })
      .addCase(removeSpecialFeature.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeSpecialFeature.fulfilled, (state, action) => {
        state.loading = false;
        state.specialFeatures = state.specialFeatures.filter(
          (feature) => feature._id !== action.payload
        );
      })
      .addCase(removeSpecialFeature.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default specialFeaturesSlice.reducer;
