import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Pages, ThemePallet } from "interfaces";
import theme from "schema/theme.json";

type ThemeMode = "dark" | "light";

export interface GlobalState {
  themeMode: ThemeMode;
  themePallet: ThemePallet;
  selectedPallet: string;
  isMobileMenuOpen: boolean;
  tour: {
    hasTour: boolean;
    pages: {
      [key in Pages]: {
        isDone: boolean;
        name: Pages;
      };
    };
  };
}

const initialState: GlobalState = {
  themeMode: "dark",
  themePallet: theme.data.dark,
  selectedPallet: "p1",
  isMobileMenuOpen: false,
  tour: {
    hasTour: true,
    pages: {
      home: {
        isDone: false,
        name: "home",
      },
      contact: {
        isDone: false,
        name: "contact",
      },
    },
  },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
      state.themePallet = theme.data[action.payload];
    },
    toggleMobileMenu: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    setThemePalette: (state, action: PayloadAction<string>) => {
      state.selectedPallet = action.payload;
    },
    setAppTour: (state, action: PayloadAction<boolean>) => {
      state.tour.hasTour = action.payload;
    },
    setPageTour: (
      state,
      action: PayloadAction<{
        name: Pages;
        isDone: boolean;
      }>
    ) => {
      const { isDone, name } = action.payload;
      state.tour.pages[name].isDone = isDone;
    },
  },
});

export const globalActions = globalSlice.actions;

export default globalSlice.reducer;
