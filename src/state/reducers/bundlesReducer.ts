import {
  createReducer,
  createAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import bundler from "editor/bundler";

export const bundleStart = createAction(
  "bundle-start",
  function prepare(id: string) {
    return { payload: { cellID: id } };
  }
);

export const createBundle = createAsyncThunk(
  "bundle-complete",
  async ({ id, input }: { id: string; input: string }, { dispatch }) => {
    dispatch(bundleStart(id));

    const result = await bundler(input);

    return {
      cellID: id,
      bundle: result,
    };
  }
);

interface CodeBundle {
  bundling: boolean;
  error: string;
  code: string;
}

interface BundlesState {
  [key: string]: CodeBundle | undefined;
}

const initialState: BundlesState = {};

const bundlesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(bundleStart, (state, action) => {
      const { cellID } = action.payload;

      state[cellID] = {
        bundling: true,
        code: "",
        error: "",
      };
    })
    .addCase(createBundle.fulfilled, (state, action) => {
      const {
        bundle: { code, err: error },
        cellID,
      } = action.payload;

      state[cellID] = {
        code,
        error,
        bundling: false,
      };
    });
});

export default bundlesReducer;
