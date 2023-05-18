import {
  configureStore
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import {
  backendApi,
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useSearchUserMutation,
} from "./api/apiSlice";

import userReducer from "./user/userSlice"

export const store = configureStore({
  reducer: {
    [backendApi.reducerPath]: backendApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(backendApi.middleware),
});

setupListeners(store.dispatch);

export { useSignupMutation, useLoginMutation, useLogoutMutation, useSearchUserMutation };
