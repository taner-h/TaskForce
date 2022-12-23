import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
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
import task from '../asset/task.svg';
import Footer from '../components/FooterSmall';
import TaskCard from '../components/TaskCard';
import { Select } from 'chakra-react-select';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLogged, getUser, getTasks } from '../reducers/authSlice';
import baseUrl from '../data/baseUrl';

export default function SearchTask() {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState({});
  const [order, setOrder] = useState('DESC');
  const [sortBy, setSortBy] = useState('recommended');
  const [isPending, setIsPending] = useState(true);
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allFields, setAllFields] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [filters, setFilters] = useState({ fields: [], skills: [], tags: [] });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const isLogged = useSelector(getIsLogged);
  const user = useSelector(getUser);
  const tasks = useSelector(getTasks);

  useEffect(() => {
    getPageContent();
    if (allFields.length === 0) getFilterOptions();
  }, [page]);

  useEffect(() => {
    if (!isPending) {
      if (page === 1) getPageContent();
      else setPage(1);
    }
  }, [filters]);

  const getFilters = () => {
    const body = {
      fields: selectedFields.map(field => field.value),
      skills: selectedSkills.map(skill => skill.value),
      tags: selectedTags.map(tag => tag.value),
    };
    return body;
  };

  const getPageContent = async () => {
    setIsPending(true);
    try {
      const response = await fetch(
        baseUrl + `/task/search?page=${page}&sortBy=${sortBy}&order=${order}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(filters),
        }
      );

      const res = await response.json();
      setContent(res);
      setIsPending(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getFilterOptions = async () => {
    try {
      const responseFields = await fetch(baseUrl + '/field');
      const fields = await responseFields.json();

      setAllFields(
        fields.map(field => ({
          value: field.field_id,
          label: field.name,
        }))
      );

      const responseSkills = await fetch(baseUrl + '/skill');
      const skills = await responseSkills.json();

      setAllSkills(
        skills.map(skill => ({
          value: skill.skill_id,
          label: skill.name,
        }))
      );

      const responseTags = await fetch(baseUrl + '/tag');
      const tags = await responseTags.json();

      setAllTags(
        tags.map(tag => ({
          value: tag.tag_id,
          label: tag.name,
        }))
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const clearFilters = () => {
    setSelectedFields([]);
    setSelectedSkills([]);
    setSelectedTags([]);
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
                Search for tasks
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
                  src={task}
                />
              </Box>
            </Flex>
          </Stack>
        </Center>
        <Center>
          <Button mx="3" width="100px" colorScheme="gray" onClick={onOpen}>
            Filter by
          </Button>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={'xl'}
            closeOnOverlayClick={false}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Filter Projects</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl p={4}>
                  <FormLabel>Fields</FormLabel>
                  <Select
                    isMulti
                    options={allFields}
                    value={selectedFields}
                    onChange={setSelectedFields}
                    variant="flushed"
                    placeholder="Select fields to filter..."
                    closeMenuOnSelect={false}
                    selectedOptionStyle="check"
                    tagVariant="subtle"
                    hideSelectedOptions={false}
                  />
                </FormControl>
                <FormControl p={4}>
                  <FormLabel>Skills</FormLabel>
                  <Select
                    isMulti
                    options={allSkills}
                    value={selectedSkills}
                    onChange={setSelectedSkills}
                    variant="flushed"
                    placeholder="Select skills to filter..."
                    closeMenuOnSelect={false}
                    selectedOptionStyle="check"
                    tagVariant="subtle"
                    hideSelectedOptions={false}
                  />
                </FormControl>
                <FormControl p={4}>
                  <FormLabel>Tags</FormLabel>
                  <Select
                    isMulti
                    options={allTags}
                    value={selectedTags}
                    onChange={setSelectedTags}
                    variant="flushed"
                    placeholder="Select tags to filter..."
                    menuShouldBlockScroll={true}
                    closeMenuOnSelect={false}
                    selectedOptionStyle="check"
                    tagVariant="subtle"
                    hideSelectedOptions={false}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button variant="outline" onClick={clearFilters} mx={'5'}>
                  Clear All
                </Button>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Button
            mx="4"
            color={'white'}
            width="120px"
            colorScheme="blue"
            bgGradient="linear(to-r, blue.300, blue.600)"
            _hover={{ bgGradient: 'linear(to-r, blue.200, blue.500)' }}
            leftIcon={<SearchIcon />}
            onClick={() => {
              setFilters(getFilters());
            }}
          >
            Search
          </Button>

          <Menu closeOnSelect={false}>
            <MenuButton as={Button} mx="3" width="100px" colorScheme="gray">
              Sort by
            </MenuButton>
            <MenuList minWidth="240px">
              <MenuOptionGroup
                defaultValue="DESC"
                value={order}
                onChange={setOrder}
                title="Order"
                type="radio"
              >
                <MenuItemOption value="ASC">Ascending</MenuItemOption>
                <MenuItemOption value="DESC">Descending</MenuItemOption>
              </MenuOptionGroup>
              <MenuDivider />
              <MenuOptionGroup
                defaultValue="recommended"
                title="Attribute"
                value={sortBy}
                onChange={setSortBy}
                type="radio"
              >
                <MenuItemOption value="recommended">Recommended</MenuItemOption>
                <MenuItemOption value="create_time">Create Time</MenuItemOption>
                <MenuItemOption value="commit_count">
                  Commit Count
                </MenuItemOption>
                <MenuItemOption value="credit_reward">
                  Credit Count
                </MenuItemOption>
                <MenuItemOption value="answer_count">
                  Answer Count
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
        <Center p={10}>
          {Object.keys(content).length !== 0 && (
            <Stack spacing={5}>
              {content.tasks?.map(task => (
                <TaskCard
                  task={task}
                  isLogged={isLogged}
                  user={user}
                  taskIds={tasks}
                  dispatch={dispatch}
                />
              ))}
            </Stack>
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
