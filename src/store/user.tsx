import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "src/app/store";
import { fetchRole } from "src/utils/services";

export interface UserState {
  role: string;
  email: string;
  username: string;
  name: string;
}

const initialState: UserState = {
  role: "mentee",
  email: "test_hoangvuduyanh@gmail.com",
  username: "hoangvuduyanh",
  name: "Hoang Vu Duy Anh",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const fetchRoleAsync = createAsyncThunk(
  "user/fetchRole",
  async (username: string) => {
    const response = await fetchRole(username);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      if (action.payload.endsWith("@vnu.edu.vn")) {
        state.username = action.payload.slice(0, action.payload.length - 11);
      } else {
        return;
      }
      state.email = action.payload;
    },
  },
});

export const { setRole, setName, setEmail } = userSlice.actions;
export const userSelector = (state: RootState) => state.user;
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export default userSlice.reducer;
