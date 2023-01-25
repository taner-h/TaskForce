import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  InputRightElement,
  Link as ChakraLink,
  InputGroup,
  Button,
  Heading,
  Spinner,
  Text,
  useColorModeValue,
  useToast, 
  Center,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import React, {  useState } from 'react';

import {
  setAuth,
  fetchUser,
  setUser,
  setTasks,
  fetchTasks,
  fetchNotifications,
  setNotifications,
  setProjects,
  fetchProjects,
} from '../reducers/authSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/FooterSmall';
import baseUrl from '../data/baseUrl';


export default function Login() {
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async event => {
    setIsPending(true);
    event.preventDefault();
    const body = { email, password };

    try {
      const response = await fetch(baseUrl + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.token) {
        setIsPending(false);
        dispatch(
          setAuth({
            token: parseRes.token,
            isLogged: true,
          })
        );
        localStorage.setItem('token', parseRes.token);
        // localStorage.setItem('user', parseRes.userId);
        navigate('/');

        toast({
          title: 'Log in successful.',
          description: `Welcome back!`,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });

        const user = await dispatch(fetchUser(parseRes.userId));

        dispatch(
          setUser({
            user: user.payload,
          })
        );

        const projects = await dispatch(fetchProjects(user.payload.user_id));

        dispatch(
          setProjects({
            projects: projects.payload,
          })
        );

        const tasks = await dispatch(fetchTasks(user.payload.user_id));

        dispatch(
          setTasks({
            tasks: tasks.payload,
          })
        );

        const notifications = await dispatch(
          fetchNotifications(user.payload.user_id)
        );

        dispatch(
          setNotifications({
            notifications: notifications.payload,
          })
        );
      } else {
        setIsPending(false);
        toast({
          title: 'Log in failed.',
          description: 'Incorrect email or password.',
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
    <>
      <Flex
        minH={' calc(100vh - 120px)'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Log in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </FormControl>

              <FormControl id="password">
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
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <ChakraLink color={'blue.400'}>Forgot password?</ChakraLink>
                </Stack>
                <Button
                  color={'white'}
                  colorScheme="blue"
                  bgGradient="linear(to-r, blue.300, blue.600)"
                  _hover={{ bgGradient: 'linear(to-r, blue.200, blue.500)' }}
                  onClick={handleLogin}
                >
                  Log in
                </Button>
                <Center>
                  {isPending && (
                      <Spinner
                          thickness="4px"
                          speed="0.65s"
                          mt="10"
                          color="blue.500"
                          size="xl"
                      />
                  )}
                </Center>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Don't have an account? Click{' '}
                  <Link to="/register" style={{ color: '#4299E1' }}>
                    here
                  </Link>{' '}
                  to register!
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      <Footer />
    </>
  );
}
