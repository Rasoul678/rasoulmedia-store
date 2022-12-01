import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistMiddleware } from "state/middlewares/persistMiddleware";
import { useTypedSelector } from "hooks/useTypedSelector";
import useActions from "hooks/useActions";
import rootReducer from "state/reducers";
import { LOCAL_STORAGE_KEY } from "../constants";

const reHydrateStore = () => {
  if (localStorage.getItem(LOCAL_STORAGE_KEY) !== null) {
    const localState = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "{}"
    );

    if (localState?.global?.appVersion === process.env.REACT_APP_VERSION) {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return {};
    }
  }
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistMiddleware.middleware),
});

export const StoreProvider = ({ children }: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
};

export const useStore = () => {
  const actions = useActions();
  const store = useTypedSelector((state) => state);

  return {
    actions,
    store,
  };
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
