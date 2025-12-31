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
  refreshToken: string | null;
  session_id: number | null;
  isHydrated: boolean;
  plan?: boolean | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  session_id: null,
  isHydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; plan: boolean; token: string; refreshToken?: string; session_id: number }>
    ) => {
      const { user, plan, token, refreshToken, session_id } = action.payload;
      state.user = user;
      state.plan = plan;
      state.token = token;
      if (refreshToken) {
        state.refreshToken = refreshToken;
      }
      state.session_id = session_id;
    },
    hydrate: (state, action: PayloadAction<{ user: any; plan: boolean; token: string | null; refreshToken: string | null; session_id: number | null }>) => {
      const { user, plan, token, refreshToken, session_id } = action.payload;
      state.user = user;
      state.plan = plan;
      state.token = token;
      state.refreshToken = refreshToken;
      state.session_id = session_id;
      state.isHydrated = true;
    },
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    logOut: (state) => {
      state.user = null;
      state.plan = null;
      state.token = null;
      state.refreshToken = null;
      state.session_id = null;
    },
  },
});

export const { setCredentials, hydrate, setToken, logOut } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentPlan = (state: RootState) => state.auth.plan;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectSessionId = (state: RootState) => state.auth.session_id;
export const selectIsHydrated = (state: RootState) => state.auth.isHydrated;

export default authSlice.reducer;
