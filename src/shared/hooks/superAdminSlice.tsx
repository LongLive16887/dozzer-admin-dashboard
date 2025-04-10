// features/superAdmin/superAdminSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SuperAdminState {
  superKey: string | null;
}

const initialState: SuperAdminState = {
  superKey: sessionStorage.getItem("superKey"),
};

const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState,
  reducers: {
    setSuperKey: (state, action: PayloadAction<string>) => {
      sessionStorage.setItem("superKey", action.payload);
      state.superKey = action.payload;
    },
    clearSuperKey: (state) => {
      sessionStorage.removeItem("superKey");
      state.superKey = null;
    },
  },
});

export const { setSuperKey, clearSuperKey } = superAdminSlice.actions;
export default superAdminSlice.reducer;
