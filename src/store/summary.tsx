import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

export interface SummaryState {
  selectedTag: string;
}

const initialState: SummaryState = {
  selectedTag: "Overview",
};

export const summarySlice = createSlice({
  name: "summary",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSelectedTag: (state, action: PayloadAction<string>) => {
      state.selectedTag = action.payload;
    },
  },
});

export const { setSelectedTag } = summarySlice.actions;

export const summarySelector = (state: RootState) => state.summary;
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export default summarySlice.reducer;
