import { Box, useColorModeValue, useToast } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import Footer from '../components/FooterSmall';
import baseUrl from '../data/baseUrl';
import {
  fetchNotifications,
  fetchProjects,
  fetchTasks,
  fetchUser,
  setAuth,
  setNotifications,
  setProjects,
  setTasks,
  setUser,
} from '../reducers/authSlice';

import Features from '../components/Features';
import Hero from '../components/Hero';
import { useDispatch } from 'react-redux';

export default function Home() {
  const toast = useToast();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const handleLogin = async () => {
      const body = { email: 'admin@mail.com', password: 'admin' };

      try {
        const response = await fetch(baseUrl + '/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();

        if (parseRes.token) {
          dispatch(
            setAuth({
              token: parseRes.token,
              isLogged: true,
            })
          );
          localStorage.setItem('token', parseRes.token);
          // localStorage.setItem('user', parseRes.userId);
          // navigate('/');

          toast({
            title: 'Log in successful.',
            description: `Welcome test user!`,
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

    console.log(location);

    if (location.pathname === '/test') {
      handleLogin();
    }
  }, []);

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
