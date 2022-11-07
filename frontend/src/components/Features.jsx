import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';

import collab from '../asset/team_collaboration.svg';
import coworking from '../asset/co-working.svg';
import { Link } from 'react-router-dom';

export default function Features({ reference }) {
  return (
    <Container ref={reference} maxW={'7xl'}>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        pt={{ base: 30, md: 40 }}
        pb={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
          >
            <Text
              as={'span'}
              bgGradient="linear(to-r, blue.300, blue.600)"
              bgClip="text"
            >
              Find others
            </Text>
            <br />

            <Text
              as={'span'}
              position={'relative'}
              zIndex={'1'}
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}
            >
              with the same idea
            </Text>
            <br />
            <Text
              as={'span'}
              bgGradient="linear(to-r, blue.300, blue.600)"
              bgClip="text"
            >
              and join them!
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            With TaskForce you can find the perfect collaborators for any
            software project you like. Want to build an app? Need someone to
            co-found a business? Find them using our recommendation system!
          </Text>
          <Stack
            align={'center'}
            justify={'center'}
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Link to={'/projects'}>
              <Button
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                colorScheme="blue"
                bgGradient="linear(to-r, blue.300, blue.600)"
                _hover={{ bgGradient: 'linear(to-r, blue.200, blue.500)' }}
              >
                Search for projects
              </Button>
            </Link>
            <Link to={'/projects/create'}>
              <Button rounded={'full'} size={'lg'} fontWeight={'normal'} px={6}>
                Create your own
              </Button>
            </Link>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}
        >
          <Blob
            w={'150%'}
            h={'150%'}
            position={'absolute'}
            top={'-20%'}
            left={0}
            zIndex={0}
            color={useColorModeValue('blue.200', 'blue.300')}
          />
          <Box
            position={'relative'}
            height={'300px'}
            rounded={'2xl'}
            width={'full'}
            overflow={'hidden'}
          >
            <Image
              alt={'Hero Image'}
              align={'center'}
              w={'100%'}
              h={'100%'}
              src={collab}
            />
          </Box>
        </Flex>
      </Stack>

      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}
        >
          <Box
            position={'relative'}
            height={'350px'}
            rounded={'2xl'}
            // boxShadow={'2xl'}
            width={'full'}
            overflow={'hidden'}
          >
            <Image
              alt={'Hero Image'}
              //   fit={'cover'}
              align={'center'}
              w={'100%'}
              h={'100%'}
              src={coworking}
            />
          </Box>
        </Flex>

        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
          >
            <Text
              as={'span'}
              bgGradient="linear(to-r, blue.300, blue.600)"
              bgClip={'text'}
            >
              Seek help
            </Text>
            <br />

            <Text
              as={'span'}
              position={'relative'}
              zIndex={'1'}
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}
            >
              for specific tasks
            </Text>
            <br />
            <Text
              as={'span'}
              bgGradient="linear(to-r, blue.300, blue.600)"
              bgClip={'text'}
            >
              & help others!
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            TaskForce also provides you a platform for solving your more
            specific problems by encouraging people to help others to get help!
            You can submit any software development related issue you have and
            get an answer that solves it for you!
          </Text>
          <Stack
            align={'center'}
            justify={'center'}
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Link to={'/tasks/create'}>
              <Button
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                colorScheme="blue"
                bgGradient="linear(to-r, blue.300, blue.600)"
                _hover={{ bgGradient: 'linear(to-r, blue.200, blue.500)' }}
              >
                Open a new task
              </Button>
            </Link>
            <Link to={'/tasks'}>
              <Button rounded={'full'} size={'lg'} fontWeight={'normal'} px={6}>
                Help others
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}

export const Blob = props => {
  return (
    <Icon
      width={'100%'}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};
