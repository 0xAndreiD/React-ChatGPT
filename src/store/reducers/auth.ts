import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export type AuthState = {
  apiKey?: string;
};

export const { actions, ...slice } = createSlice<
  AuthState,
  {
    login: CaseReducer<AuthState, PayloadAction<AuthState>>;
    logout: CaseReducer<AuthState>;
  }
>({
  name: "auth",
  initialState: {},
  reducers: {
    login: (state, { payload }) => payload,
    logout: () => ({}),
  },
});

const persistConfig = {
  key: "chatgpt-auth",
  version: 1,
  storage,
};

export const reducer = persistReducer(persistConfig, slice.reducer);

export function useLogin() {
  const dispatch = useDispatch();
  return (payload: AuthState) => dispatch(actions.login(payload));
}

export function useLogout() {
  const dispatch = useDispatch();
  return () => dispatch(actions.logout());
}
