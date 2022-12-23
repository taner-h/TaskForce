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
import tasklist from '../asset/task-list.svg';
import Footer from '../components/FooterSmall';
import TaskCard from '../components/TaskCard';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLogged, getUser, getTasks } from '../reducers/authSlice';
import baseUrl from '../data/baseUrl';

export default function MyTasks() {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState({});
  const [order, setOrder] = useState('DESC');
  const [sortBy, setSortBy] = useState('create_time');
  const [isPending, setIsPending] = useState(true);
  const [type, setType] = useState('all');
  const dispatch = useDispatch();
  const isLogged = useSelector(getIsLogged);
  const user = useSelector(getUser);
  const tasks = useSelector(getTasks);

  useEffect(() => {
    if (tasks) getPageContent();
  }, [page, tasks]);

  useEffect(() => {
    if (!isPending) {
      if (page === 1) getPageContent();
      else setPage(1);
    }
  }, [type]);

  const getPageContent = async () => {
    setIsPending(true);
    try {
      const response = await fetch(
        baseUrl +
          `/task/user?type=${type}&page=${page}&sortBy=${sortBy}&order=${order}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tasks),
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
                My Tasks
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
                  src={tasklist}
                />
              </Box>
            </Flex>
          </Stack>
        </Center>
        <Center>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} mx="3" width="100px" colorScheme="gray">
              Type
            </MenuButton>
            <MenuList minWidth="240px">
              <MenuOptionGroup
                defaultValue="create_time"
                title="Tasks type"
                value={type}
                onChange={setType}
                type="radio"
              >
                <MenuItemOption value="all">
                  All{' '}
                  <Badge>
                    {tasks &&
                      Object.keys(tasks)
                        .map(key => tasks[key].length)
                        .reduce((a, b) => a + b)}
                  </Badge>
                </MenuItemOption>
                <MenuItemOption value="created">
                  Created <Badge>{tasks?.created.length}</Badge>
                </MenuItemOption>
                <MenuItemOption value="answered">
                  Answered <Badge>{tasks?.answered.length}</Badge>
                </MenuItemOption>
                <MenuItemOption value="committed">
                  Committed <Badge>{tasks?.committed.length}</Badge>
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
            <Stack spacing={5}>
              {content.tasks?.map(task => (
                <TaskCard
                  page="mytasks"
                  task={task}
                  taskIds={tasks}
                  isLogged={isLogged}
                  user={user}
                  dispatch={dispatch}
                />
              ))}
            </Stack>
          )}
          {Object.keys(content).length !== 0 &&
            content.tasks.length === 0 &&
            !isPending && (
              <Text>You have no {type === 'all' ? '' : type} tasks.</Text>
            )}
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
            pageSize={12}
            current={page}
            total={content?.totalItems}
          />
        </Center>
      </Box>
      <Footer />
    </>
  );
}
