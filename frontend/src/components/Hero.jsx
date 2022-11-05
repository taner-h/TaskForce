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
} from '@chakra-ui/react';
import { HOME_TEXTS } from '../data/options';

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
          <Button onClick={scrollToLearn} rounded={'full'} px={6}>
            Learn more
          </Button>
        </Stack>
        <Flex maxWidth={'550px'} pt={'50px'} justify="center" align="center">
          <img src={scrum} alt="collaboration"></img>
        </Flex>
      </Stack>
    </Container>
  );
}
