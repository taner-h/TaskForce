import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import theme from './theme';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './components/NotFound';
import Pricing from './pages/Pricing';
import Home from './pages/Home';
function App() {
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
