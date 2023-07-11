import { combineReducers } from "redux";

import { reducer as auth } from "./auth";
import { reducer as alert } from "./alert";

export const rootReducer = combineReducers({
  auth,
  alert,
});

export type RootState = ReturnType<typeof rootReducer>;
