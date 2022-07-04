import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import userReducer from 'src/store/user';
import summaryReducer from 'src/store/summary';
import tasksReducer from 'src/store/tasks';
import { persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  user: userReducer,
  summary: summaryReducer,
  tasks: tasksReducer
})

const persistConfig = {
  key: "root",
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
