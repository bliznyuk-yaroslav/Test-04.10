import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { api } from '../../lib/api';
import {
  clearToken,
  getToken,
  setToken,
  setEmail,
  clearEmail,
  setAuthCookie,
  clearAuthCookie,
} from '../../lib/auth';

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: typeof window !== 'undefined' ? getToken() : null,
  loading: false,
  error: null,
};

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }) => {
    const { token } = await api.login(payload.email, payload.password);
    setToken(token);
    setEmail(payload.email);
    setAuthCookie(token);
    return token;
  },
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (payload: { email: string; password: string }) => {
    const { token } = await api.register(payload.email, payload.password);
    setToken(token);
    setEmail(payload.email);
    setAuthCookie(token);
    return token;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state: AuthState) {
      clearToken();
      clearEmail();
      clearAuthCookie();
      state.token = null;
    },
    setAuthToken(state: AuthState, action: PayloadAction<string | null>) {
      state.token = action.payload ?? null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
      .addCase(loginThunk.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state: AuthState, action: PayloadAction<string>) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginThunk.rejected, (state: AuthState, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(registerThunk.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state: AuthState, action: PayloadAction<string>) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(registerThunk.rejected, (state: AuthState, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      });
  },
});

export const { logout, setAuthToken } = authSlice.actions;
export default authSlice.reducer;
