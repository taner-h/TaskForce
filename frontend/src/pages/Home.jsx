import { Flex, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
export default function Register() {
  return (
    <Flex
      minH={' calc(100vh - 64px)'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Hero />
    </Flex>
  );
}
