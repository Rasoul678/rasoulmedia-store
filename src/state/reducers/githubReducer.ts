import { createAction, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GithubState {
  repositories: any[];
  isLoading: boolean;
  error: string;
}

const initialState: GithubState = {
  repositories: [],
  isLoading: false,
  error: "",
};

export const getGithubRepos = createAction("github/getGithubRepos");

export const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    setGithubRepos: (state, action: PayloadAction<any[]>) => {
      state.repositories = action.payload;
    },
    setGithubLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setGithubError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const githubActions = { ...githubSlice.actions, getGithubRepos };

export default githubSlice.reducer;
