import { combineReducers } from "redux";
import githubReducer, { githubActions } from "state/reducers/githubReducer";
import globalReducer, { globalActions } from "state/reducers/globalReducer";
import bundlesReducer, {
  bundleStart,
  createBundle,
} from "state/reducers/bundlesReducer";
import cellsReducer, {
  deleteCell,
  insertCellAfter,
  moveCell,
  updateCell,
} from "state/reducers/cellsReducer";

const rootReducer = combineReducers({
  global: globalReducer,
  github: githubReducer,
  bundles: bundlesReducer,
  cells: cellsReducer,
});

export const actionCreators = {
  ...githubActions,
  ...globalActions,
  bundleStart,
  createBundle,
  deleteCell,
  insertCellAfter,
  moveCell,
  updateCell,
};

export default rootReducer;
