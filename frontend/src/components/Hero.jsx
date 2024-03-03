import {
  Flex,
  Container,
  Heading,
  useColorModeValue,
  Stack,
  Box,
  Collapse,
  Fade,
  Text,
  Button,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';
import { HOME_TEXTS } from '../data/options';

import github from '../asset/github.svg';
import scrum from '../asset/scrum.svg';
import { Link } from 'react-router-dom';

export default function Hero({ scrollToLearn }) {
  function random(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        pt={{ base: 20, md: 28 }}
        // pb={{ base: 10, md: 14 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Are you looking for developers to help you{' '}
          <Text
            as={'span'}
            bgGradient={'linear(to-r, blue.300, blue.600)'}
            bgClip="text"
          >
            {HOME_TEXTS[random(HOME_TEXTS.length)]}
          </Text>
        </Heading>
        <Text fontSize="large" color={'gray.500'} maxW={'3xl'}>
          TaskForce is an online collaboration platform made for developers, by
          developers. You can create and search for software development
          projects and become a part of a community where collaboration and
          teamwork is fundemental and foremost.
        </Text>
        <Stack spacing={6} direction={'row'} mb="10px">
          <Link to={'/register'}>
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'blue'}
              bgGradient="linear(to-r, blue.300, blue.600)"
              _hover={{ bgGradient: 'linear(to-r, blue.200, blue.500)' }}
            >
              Get started
            </Button>
          </Link>
          <a href="https://github.com/taner-h/taskforce">
            <Button rounded={'full'} px={6}>
              <svg
                style={{ marginRight: '6px' }}
                width="18px"
                height="18px"
                viewBox="0 0 1024 1024"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                  transform="scale(64)"
                  fill="#fff"
                />
              </svg>
              GitHub
            </Button>
          </a>
        </Stack>
        <Flex maxWidth={'550px'} pt={'50px'} justify="center" align="center">
          <img src={scrum} alt="collaboration"></img>
        </Flex>
      </Stack>
    </Container>
  );
}
