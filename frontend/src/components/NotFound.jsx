import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Flex
      minH={' calc(100vh - 64px)'}
      align={'center'}
      justify={'center'}
      //   bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h1"
          size="4xl"
          bgGradient="linear(to-r, blue.300, blue.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="2.5rem" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text fontSize="1.1rem" color={'gray.500'} mb={6}>
          Oops, the page you're looking for does not seem to exist!
        </Text>
        <Link to="/">
          <Button
            colorScheme="blue"
            bgGradient="linear(to-r, blue.300, blue.600)"
            _hover={{ bgGradient: 'linear(to-r, blue.200, blue.500)' }}
            color="white"
            variant="solid"
          >
            Go to Home
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}
