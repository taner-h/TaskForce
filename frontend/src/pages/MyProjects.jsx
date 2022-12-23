import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Badge,
  Flex,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  SimpleGrid,
  Spinner,
  useDisclosure,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Pagination from 'rc-pagination';
import React, { useEffect, useState } from 'react';
import '../asset/pagination.css';
import development from '../asset/development.svg';
import Footer from '../components/FooterSmall';
import ProjectCard from '../components/ProjectCard';
import { useSelector } from 'react-redux';
import { getIsLogged, getUser, getProjects } from '../reducers/authSlice';
import baseUrl from '../data/baseUrl';

export default function MyProjects() {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState({});
  const [order, setOrder] = useState('DESC');
  const [sortBy, setSortBy] = useState('create_time');
  const [isPending, setIsPending] = useState(true);
  const [role, setRole] = useState('all');

  const isLogged = useSelector(getIsLogged);
  const user = useSelector(getUser);
  const projects = useSelector(getProjects);

  useEffect(() => {
    if (projects) getPageContent();
  }, [page, projects]);

  useEffect(() => {
    if (!isPending) {
      if (page === 1) getPageContent();
      else setPage(1);
    }
  }, [role]);

  const getPageContent = async () => {
    setIsPending(true);
    try {
      const response = await fetch(
        baseUrl +
          `/project/user?role=${role}&page=${page}&sortBy=${sortBy}&order=${order}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projects),
        }
      );

      const res = await response.json();
      setContent(res);
      setIsPending(false);
    } catch (err) {
      console.error(err.message);
    }
  };

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
                My Projects
              </Text>
            </Heading>
            <Flex
              maxW="md"
              flex={1}
              justify={'center'}
              align={'center'}
              position={'relative'}
              w={'full'}
            >
              <Box
                position={'relative'}
                height={'240px'}
                rounded={'2xl'}
                width={'full'}
                overflow={'hidden'}
              >
                <Image
                  alt={'Hero Image'}
                  align={'center'}
                  w={'100%'}
                  h={'100%'}
                  src={development}
                />
              </Box>
            </Flex>
          </Stack>
        </Center>
        <Center>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} mx="3" width="100px" colorScheme="gray">
              Role
            </MenuButton>
            <MenuList minWidth="240px">
              <MenuOptionGroup
                defaultValue="create_time"
                title="Project role"
                value={role}
                onChange={setRole}
                type="radio"
              >
                <MenuItemOption value="all">
                  All{' '}
                  <Badge>
                    {projects &&
                      Object.keys(projects)
                        .map(key => projects[key].length)
                        .reduce((a, b) => a + b)}
                  </Badge>
                </MenuItemOption>
                <MenuItemOption value="creator">
                  Creator <Badge>{projects?.creator.length}</Badge>
                </MenuItemOption>
                <MenuItemOption value="member">
                  Member <Badge>{projects?.member.length}</Badge>
                </MenuItemOption>
                <MenuItemOption value="applicant">
                  Applicant <Badge>{projects?.applicant.length}</Badge>
                </MenuItemOption>
                <MenuItemOption value="invitee">
                  Invitee <Badge>{projects?.invitee.length}</Badge>
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
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
          {Object.keys(content).length !== 0 && (
            <SimpleGrid columns={{ base: 1, lg: 2, '2xl': 3 }}>
              {content.projects?.map(project => (
                <ProjectCard
                  pageName={'myprojects'}
                  project={project}
                  isLogged={isLogged}
                  user={user}
                />
              ))}
            </SimpleGrid>
          )}
          {Object.keys(content).length !== 0 &&
            content.projects.length === 0 &&
            !isPending && <Text>You have no {role} projects.</Text>}
        </Center>
        <Center pb="10">
          <Pagination
            sx={{
              '.rc-pagination-item': {
                backgroundColor: 'gray.700',
                border: '1px solid #d9d9d9',
              },
            }}
            defaultCurrent={1}
            onChange={page => {
              setPage(page);
            }}
            pageSize={9}
            current={page}
            total={content?.totalItems}
          />
        </Center>
      </Box>
      <Footer />
    </>
  );
}
