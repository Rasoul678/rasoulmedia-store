import { combineReducers } from "redux";
import githubReducer, { githubActions } from "state/reducers/githubReducer";
import globalReducer, { globalActions } from "state/reducers/globalReducer";

const rootReducer = combineReducers({
  global: globalReducer,
  github: githubReducer,
});

export const actionCreators = {
  ...githubActions,
  ...globalActions,
};

export default rootReducer;
