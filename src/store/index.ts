import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { persistStore } from "redux-persist";

import { rootReducer, RootState } from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const useStoreSelector = useSelector<RootState>;

export const persistor = persistStore(store);

export default store;
