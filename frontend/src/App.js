import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import theme from './theme';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './components/NotFound';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
