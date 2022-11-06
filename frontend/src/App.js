import React, { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import theme from './theme';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './components/NotFound';
import Pricing from './pages/Pricing';
import Home from './pages/Home';
import { setAuth, fetchUser, verifyToken } from './reducers/authSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  const auth = async () => {
    // check if token in localstorage is valid
    const isTokenValid = await dispatch(verifyToken());
    // if token is valid get user info and set state
    if (isTokenValid.payload.isAuth) {
      dispatch(
        setAuth({
          token: localStorage.token,
          user: null,
          isLogged: true,
        })
      );
      const user = await dispatch(fetchUser(isTokenValid.payload.userId));
      dispatch(
        setAuth({
          token: localStorage.token,
          user: user.payload,
          isLogged: true,
        })
      );
    }
  };

  useEffect(() => {
    auth();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pricing" element={<Pricing />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
