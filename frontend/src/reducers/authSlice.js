import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  isLogged: false,
  token: null,
  user: null,
  projects: null,
  tasks: null,
};

export const verifyToken = createAsyncThunk('auth/verifyToken', async () => {
  try {
    const response = await fetch('http://localhost:5000/auth/verify', {
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

export const fetchProjects = createAsyncThunk(
  'user/getProjects',
  async userId => {
    try {
      const response = await fetch(
        `http://localhost:5000/project/user/${userId}`,
        {
          method: 'GET',
        }
      );

      return await response.json();
    } catch (err) {
      console.error(err.message);
    }
  }
);
export const fetchTasks = createAsyncThunk('user/getTasks', async userId => {
  try {
    const response = await fetch(`http://localhost:5000/task/user/${userId}`, {
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

    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      state.isLogged = false;
      state.projects = null;
      state.tasks = null;

      localStorage.removeItem('token');
    },
  },
});

export const { setAuth, setUser, setProjects, setTasks, logOut } =
  authSlice.actions;

export default authSlice.reducer;

export const getUser = state => state.auth.user;
export const getToken = state => state.auth.token;
export const getIsLogged = state => state.auth.isLogged;
export const getProjects = state => state.auth.projects;
export const getTasks = state => state.auth.tasks;
