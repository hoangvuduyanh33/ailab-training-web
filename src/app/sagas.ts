import { PayloadAction } from "@reduxjs/toolkit";
import { userApi } from "src/services";
import { callbackify } from "util";
import { all, call } from "redux-saga/effects";
function* syncUserSaga(action: PayloadAction<string>) {
  const username = action.payload;
  console.log("value = ", username);
  try {
    //@ts-ignore
    const data = yield call(userApi.getUsers, {
      username: "username",
    });
  } catch (e) {
    console.log(e);
  }
}

export default function* rootSaga() {}
