import { Flex, Box, useColorModeValue, Stack } from '@chakra-ui/react';
import { useRef } from 'react';

import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Features from '../components/Features';

export default function Home() {
  const ref = useRef(null);
  const scrollToLearn = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      minH={' calc(100vh - 64px)'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Hero scrollToLearn={scrollToLearn} />
      <Features reference={ref} />
      <Footer />
    </Box>
  );
}
