import { isAnyOf } from "@reduxjs/toolkit";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { actionCreators } from "state/reducers";
import { RootState } from "state/store";
import { LOCAL_STORAGE_KEY } from "../../constants";

const {
  setAppTour,
  setGithubError,
  setGithubLoading,
  setPageTour,
  setThemePalette,
  toggleMobileMenu,
  toggleThemeMode,
  getGithubRepos,
  setGithubRepos,
} = actionCreators;

export const persistMiddleware = createListenerMiddleware();

persistMiddleware.startListening({
  matcher: isAnyOf(
    setAppTour,
    setPageTour,
    setThemePalette,
    toggleMobileMenu,
    toggleThemeMode
  ),
  effect: async (_action, listenerAPI) => {
    listenerAPI.cancelActiveListeners();

    const {
      global: { themeMode, themePallet, selectedPallet, tour },
    } = listenerAPI.getState() as RootState;

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        global: {
          appVersion: process.env.REACT_APP_VERSION,
          themeMode,
          themePallet,
          selectedPallet,
          tour,
        },
      })
    );
  },
});

persistMiddleware.startListening({
  actionCreator: getGithubRepos,
  effect: async (_action, listenerAPI) => {
    listenerAPI.cancelActiveListeners();

    listenerAPI.dispatch(setGithubLoading(true));

    try {
      const response = await fetch(
        "https://api.github.com/users/rasoul678/repos?per_page=100"
      );
      const repos = await response.json();

      const myOwnRepos = repos.filter((repo: any) => !repo.fork);

      listenerAPI.dispatch(setGithubLoading(false));
      listenerAPI.dispatch(setGithubRepos(myOwnRepos));
      return myOwnRepos;
    } catch (error) {
      listenerAPI.dispatch(setGithubLoading(false));
      listenerAPI.dispatch(setGithubError((error as Error).message));
    }
  },
});
