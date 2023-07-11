import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export enum AlertType {
  Success = 1,
  Info,
  Error,
}

export type AlertState = {
  type?: AlertType;
  message?: string;
};

export const { reducer, actions } = createSlice<
  AlertState,
  {
    show: CaseReducer<AlertState, PayloadAction<AlertState>>;
    hide: CaseReducer<AlertState>;
  }
>({
  name: "alert",
  initialState: {} as AlertState,
  reducers: {
    show: (state, { payload }) => payload,
    hide: () => ({}),
  },
});

export function useShowAlert() {
  const dispatch = useDispatch();
  return (payload: AlertState) => dispatch(actions.show(payload));
}

export function useHideAlert() {
  const dispatch = useDispatch();
  return () => dispatch(actions.hide());
}
