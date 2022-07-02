import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

export interface TasksState {
  tabIndex: number;
}

const initialState: TasksState = {
  tabIndex: 0,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTabIndex: (state, action: PayloadAction<number>) => {
      state.tabIndex = action.payload;
    },
  },
});

export const { setTabIndex } = tasksSlice.actions;
export const tasksSelector = (state: RootState) => state.tasks;
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export default tasksSlice.reducer;
