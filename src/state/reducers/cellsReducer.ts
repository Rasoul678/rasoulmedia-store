import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

export type CellTypes = "code" | "text";
export type DirectionTypes = "up" | "down";

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
  createdAt: string;
  updatedAt: string | null;
}

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: "",
  data: {},
  order: [],
};

export const insertCellAfter = createAction(
  "insert-cell-after",
  function prepare(type: CellTypes, id: string | null = null) {
    const cell: Cell = {
      id: nanoid(),
      createdAt: new Date().toLocaleString(),
      updatedAt: null,
      content: "",
      type,
    };

    return {
      payload: { cell, targetID: id },
    };
  }
);

export const updateCell = createAction(
  "update-cell",
  function prepare(content: string, id: string) {
    return {
      payload: {
        id,
        content,
        updatedAt: new Date().toLocaleString(),
      } as Pick<Cell, "id" | "content" | "updatedAt">,
    };
  }
);

export const deleteCell = createAction(
  "delete-cell",
  function prepare(id: string) {
    return { payload: id };
  }
);

export const moveCell = createAction(
  "move-cell",
  function prepare(direction: DirectionTypes, id: string) {
    return {
      payload: {
        id,
        direction,
      },
    };
  }
);

const cellsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(insertCellAfter, (state, action) => {
      const { cell, targetID } = action.payload;

      if (cell.type === "code") {
        cell.content = `// Use "show()" to display something! 🤩 \n // e.g: show(<div>Hello World!</div>)`;
      }

      state.data[cell.id] = cell;

      const index = state.order.findIndex((id) => id === targetID);

      if (index === -1) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(index + 1, 0, cell.id);
      }
    })
    .addCase(deleteCell, (state, action) => {
      const deletingCellID = action.payload;

      //* delete from order array
      state.order = state.order.filter((id) => id !== deletingCellID);
      //* delete from object
      delete state.data[deletingCellID];
    })
    .addCase(moveCell, (state, action) => {
      const { id, direction } = action.payload;

      const index = state.order.findIndex((x) => x === id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = id;
    })
    .addCase(updateCell, (state, action) => {
      const { id, content, updatedAt } = action.payload;

      state.data[id].content = content;
      state.data[id].updatedAt = updatedAt;
    });
});

export default cellsReducer;
