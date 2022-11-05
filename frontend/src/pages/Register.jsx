import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  useToast,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { setAuth } from '../reducers/authSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const toast = useToast();
  const dispatch = useDispatch();

  const handleSubmit = async event => {
    event.preventDefault();
    const body = { email, password, name, surname };
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem('token', parseRes.token);
        localStorage.setItem('user', parseRes.userId);

        toast({
          title: 'Register successful.',
          description: 'Welcome to TaskForce!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        dispatch(
          setAuth({
            token: parseRes.token,
            userId: parseRes.userId,
            isLogged: true,
          })
        );
      } else {
        toast({
          title: 'Register failed.',
          description: 'Make sure that email is valid.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Flex
      minH={' calc(100vh - 64px)'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Register for free
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            or{' '}
            <Link to="/pricing" style={{ color: '#4299E1' }}>
              see
            </Link>{' '}
            our other offers!
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={event => setName(event.target.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={surname}
                    onChange={event => setSurname(event.target.value)}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword(showPassword => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                onClick={handleSubmit}
                size="lg"
                color={'white'}
                colorScheme="blue"
                bgGradient="linear(to-r, blue.300, blue.600)"
                _hover={{ bgGradient: 'linear(to-r, blue.200, blue.500)' }}
              >
                Register
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? Click{' '}
                <Link to="/login" style={{ color: '#4299E1' }}>
                  here
                </Link>{' '}
                to log in!
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
