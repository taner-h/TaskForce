import { Flex, Box, useColorModeValue, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
export default function Home() {
  return (
    <Box
      minH={' calc(100vh - 64px)'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Hero />
      <Footer />
    </Box>
  );
}
