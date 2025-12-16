import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface User {
  id: string;
  email: string;
  name: string;
  [key: string]: any;
  company: any;
}

interface AuthState {
  user: User | null;
  token: string | null;
  session_id: number | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  session_id: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string; session_id: number }>
    ) => {
      const { user, token, session_id } = action.payload;
      state.user = user;
      state.token = token;
      state.session_id = session_id
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.session_id = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectSessionId = (state: RootState) => state.auth.session_id;

export default authSlice.reducer;
