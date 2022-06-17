import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from 'src/store/counter/counterSlice';
import userReducer from 'src/store/user';
import summaryReducer from 'src/store/summary';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    summary: summaryReducer,
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
