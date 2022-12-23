import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import baseUrl from '../data/baseUrl';

const initialState = {
  isLogged: false,
  token: null,
  user: null,
  projects: null,
  tasks: null,
  notifications: null,
};

export const verifyToken = createAsyncThunk('auth/verifyToken', async () => {
  try {
    const response = await fetch(baseUrl + '/auth/verify', {
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
    const response = await fetch(baseUrl + `/user/${userId}`, {
      method: 'GET',
    });

    return await response.json();
  } catch (err) {
    console.error(err.message);
  }
});

export const fetchProjects = createAsyncThunk(
  'user/getProjects',
  async userId => {
    try {
      const response = await fetch(baseUrl + `/project/user/${userId}`, {
        method: 'GET',
      });

      return await response.json();
    } catch (err) {
      console.error(err.message);
    }
  }
);
export const fetchTasks = createAsyncThunk('user/getTasks', async userId => {
  try {
    const response = await fetch(baseUrl + `/task/user/${userId}`, {
      method: 'GET',
    });

    return await response.json();
  } catch (err) {
    console.error(err.message);
  }
});

export const fetchNotifications = createAsyncThunk(
  'user/getNotifications',
  async userId => {
    try {
      const response = await fetch(baseUrl + `/notification/new/${userId}`, {
        method: 'GET',
      });

      return await response.json();
    } catch (err) {
      console.error(err.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { token, isLogged } = action.payload;
      state.token = token;
      state.isLogged = isLogged;
    },

    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },

    setProjects: (state, action) => {
      const { projects } = action.payload;
      state.projects = projects;
    },

    setTasks: (state, action) => {
      const { tasks } = action.payload;
      state.tasks = tasks;
    },

    setNotifications: (state, action) => {
      const { notifications } = action.payload;
      state.notifications = notifications;
    },

    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      state.isLogged = false;
      state.projects = null;
      state.tasks = null;
      state.notifications = null;
      localStorage.removeItem('token');
    },
  },
});

export const {
  setAuth,
  setUser,
  setProjects,
  setTasks,
  setNotifications,
  logOut,
} = authSlice.actions;

export default authSlice.reducer;

export const getUser = state => state.auth.user;
export const getToken = state => state.auth.token;
export const getIsLogged = state => state.auth.isLogged;
export const getProjects = state => state.auth.projects;
export const getTasks = state => state.auth.tasks;
export const getNotifications = state => state.auth.notifications;
