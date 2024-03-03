import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import match from '../asset/match.svg';
import Footer from '../components/FooterSmall';
import ProjectCard from '../components/ProjectCard';
import {
  getIsLogged,
  getProjects,
  getTasks,
  getUser,
  setUser,
} from '../reducers/authSlice';
import baseUrl from '../data/baseUrl';

export default function MatchProjects() {
  const [tagIds, setTagIds] = useState({});
  const [matchedProjects, setMatchedProjects] = useState([]);
  const [prevMatchedProjects, setPrevMatchedProjects] = useState([]);
  const [isTagIdsFetched, setIsTagIdsFetched] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [view, setView] = useState('new');

  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector(getUser);
  const projects = useSelector(getProjects);
  const tasks = useSelector(getTasks);
  const isLogged = useSelector(getIsLogged);

  useEffect(() => {
    getTagIds();
  }, [projects, tasks, user]);

  async function getTagIds() {
    const body = {
      created: projects?.creator,
      member: projects?.member,
      applied: projects?.applicant,
      opened: tasks?.created,
      committed: tasks?.committed,
      answered: tasks?.answered,
    };
    try {
      console.log('tag id aliniyor');
      console.log('body', body);
      const response = await fetch(baseUrl + `/user/tags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const res = await response.json();
      setTagIds(res);
      setIsTagIdsFetched(true);
      console.log('tag id alindi');
      console.log('tag ids', res);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getProjectMatches(method) {
    if (isTagIdsFetched) {
      console.log('match aliniyor');
      setIsPending(true);
      const body = {
        userId: user.user_id,
        fields: user.fields.map(field => field.field_id),
        skills: user.skills.map(skill => skill.skill_id),
        created: tagIds.created,
        member: tagIds.member,
        applied: tagIds.applied,
        opened: tagIds.opened,
        committed: tagIds.committed,
        answered: tagIds.answered,
        method: method,
      };
      try {
        const response = await fetch(baseUrl + `/project/match`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const res = await response.json();
        setMatchedProjects(res);
        setIsPending(false);
        setView('new');
        if (method === 'free') {
          dispatch(
            setUser({
              user: {
                ...user,
                match_credit: user.match_credit - 1,
              },
            })
          );
        } else if (method === 'credit') {
          dispatch(
            setUser({
              user: {
                ...user,
                credit_count: user.credit_count - 3,
              },
            })
          );
        }
      } catch (err) {
        setIsPending(false);
        toast({
          title: 'Match failed',
          description: 'Please try again 2 seconds later',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        console.error(err.message);
      }
    } else {
      toast({
        title: "We're fetching your data",
        description: 'Please try again 2 seconds later',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
    }
  }

  async function getPreviousProjectMatches() {
    try {
      setIsPending(true);
      const response = await fetch(baseUrl + `/project/match/${user.user_id}`);
      const res = await response.json();
      setPrevMatchedProjects(res);
      setView('all');
      setIsPending(false);
    } catch (err) {
      setIsPending(false);

      console.error(err.message);
    }
  }

  return (
    <>
      <Box
        bg={useColorModeValue('gray.50', 'gray.800')}
        minH={'calc(100vh - 120px)'}
      >
        <Center
          align={'center'}
          justify={'center'}
          spacing={{ base: 8, md: 10 }}
          p="50px"
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack
            align={'center'}
            justify={'center'}
            direction="column"
            spacing={{ base: 5, md: 10 }}
          >
            <Heading
              lineHeight={1.1}
              flex={1}
              fontWeight={600}
              fontSize={{ base: '4xl', lg: '6xl' }}
            >
              <Text
                as={'span'}
                bgGradient="linear(to-r, blue.300, blue.600)"
                bgClip="text"
              >
                Match Projects
              </Text>
            </Heading>
            <Flex
              maxW="xl"
              flex={1}
              justify={'center'}
              align={'center'}
              position={'relative'}
              w={'full'}
            >
              <Box
                position={'relative'}
                // height={'240px'}
                // w="900px"
                rounded={'2xl'}
                // width={'full'}
                overflow={'hidden'}
              >
                <Image
                  alt={'Hero Image'}
                  align={'center'}
                  w={'100%'}
                  h={'100%'}
                  src={match}
                />
              </Box>
            </Flex>
          </Stack>
        </Center>
        <Center>
          <Stack spacing={5}>
            <Heading size="sm" align="center">
              {user && `You have ${user.match_credit} free matches`}
            </Heading>
            {matchedProjects.length === 0 && (
              <>
                <Button
                  disabled={user?.match_credit === 0}
                  variant="solid"
                  colorScheme="blue"
                  onClick={() => {
                    getProjectMatches('free');
                  }}
                >
                  Use a free match
                </Button>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  onClick={() => {
                    getProjectMatches('credit');
                  }}
                  disabled={user?.credit_count < 3}
                >
                  Use 3 credits
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              colorScheme="blue"
              onClick={getPreviousProjectMatches}
            >
              See previous matches
            </Button>
          </Stack>
        </Center>
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
        <Center pt={6} pb="10">
          {Object.keys(matchedProjects).length !== 0 && view === 'new' && (
            <SimpleGrid
              columns={matchedProjects.length === 2 ? { base: 1, lg: 2 } : 1}
            >
              {matchedProjects?.map(project => (
                <ProjectCard
                  project={project}
                  isLogged={isLogged}
                  user={user}
                />
              ))}
            </SimpleGrid>
          )}
          {prevMatchedProjects.length !== 0 && view === 'all' && (
            <SimpleGrid
              // columns={{ base: 1, lg: 2, '2xl': 3 }}
              columns={matchedProjects.length === 1 ? 1 : { base: 1, lg: 2 }}
            >
              {prevMatchedProjects?.map(project => (
                <ProjectCard
                  project={project}
                  isLogged={isLogged}
                  user={user}
                />
              ))}
            </SimpleGrid>
          )}
        </Center>
      </Box>
      <Footer />
    </>
  );
}
