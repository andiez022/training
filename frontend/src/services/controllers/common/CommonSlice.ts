import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommonState {
  loading: boolean;
  ui: {
    dialog: {
      [name: string]: boolean;
    };
    dialogState: any;
  };
}

const initialState: CommonState = {
  loading: false,
  ui: { dialog: {}, dialogState: undefined },
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    toggleModals: (state, action: PayloadAction<string>) => {
      state.ui.dialog = {
        ...state.ui.dialog,
        [action.payload]: !state.ui.dialog[action.payload],
      };
    },
    closeModals: (state, action: PayloadAction<string>) => {
      state.ui.dialog = { ...state.ui.dialog, [action.payload]: false };
    },
  },
});

export const { setLoading, toggleModals, closeModals } = commonSlice.actions;

export default commonSlice.reducer;
