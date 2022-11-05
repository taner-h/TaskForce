import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  isLogged: false,
  token: null,
  user: null,
};

export const incrementAsync = createAsyncThunk('auth/isAuth', async () => {
  try {
    const response = await fetch('/auth/verify', {
      method: 'GET',
      headers: { token: localStorage.token },
    });

    return await response.json();
  } catch (err) {
    console.error(err.message);
  }
});

export const fetchUser = createAsyncThunk('user/getUser', async userId => {
  try {
    const response = await fetch(`http://localhost:5000/user/${userId}`, {
      method: 'GET',
    });

    return await response.json();
  } catch (err) {
    console.error(err.message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user, token, isLogged } = action.payload;
      state.user = user;
      state.token = token;
      state.isLogged = isLogged;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      state.isLogged = false;
    },
  },
});

export const { setAuth, logOut } = authSlice.actions;

export default authSlice.reducer;

export const getUser = state => state.auth.user;
export const getToken = state => state.auth.token;
export const getIsLogged = state => state.auth.isLogged;
