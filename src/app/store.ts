import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from 'src/store/counter/counterSlice';
import userReducer from 'src/store/user';
import summaryReducer from 'src/store/summary';
import tasksReducer from 'src/store/tasks';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    summary: summaryReducer,
    tasks: tasksReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
