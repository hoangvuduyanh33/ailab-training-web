import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "src/app/store";

export interface UserState {
  role: string;
  email: string;
  username: string;
  userId: string;
  name: string;
  token: string;
}

const initialState: UserState = {
  role: "",
  email: "",
  username: "",
  userId: "",
  name: "",
  token: "",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export interface UserProps {
  role?: string;
  name?: string;
  email?: string
  userId?: string;
  token?: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUser: (state: any, action: PayloadAction<UserProps>) => {
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.email = action.payload.email;
      if (state.email.endsWith === "@vnu.edu.vn") {
        state.username = state.email.slice(0, state.email - 11);
      }
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    syncUser: (state: any, action: PayloadAction<string>) => { }
  },
});

export const { setUser, syncUser } = userSlice.actions;
export const userSelector = (state: RootState) => state.user;
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export default userSlice.reducer;
