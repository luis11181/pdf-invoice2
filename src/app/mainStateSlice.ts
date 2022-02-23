import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface CounterState {
  autenticado: boolean | null;
  darkMode: boolean;
}

const initialState: CounterState = {
  autenticado: null,
  darkMode: false,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeAuthState: (state, action: PayloadAction<boolean | null>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      state.autenticado = action.payload;
    },
  },
});

export const { changeAuthState } = mainSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAutenticado = (state: RootState) => state.main.autenticado;

export default mainSlice.reducer;
