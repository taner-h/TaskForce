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
import search from '../asset/web_search.svg';
import Footer from '../components/FooterSmall';
import ProjectCard from '../components/ProjectCard';
import { Select } from 'chakra-react-select';
import { useSelector } from 'react-redux';
import { getIsLogged, getUser } from '../reducers/authSlice';

export default function SearchProject() {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState({});
  const [order, setOrder] = useState('DESC');
  const [sortBy, setSortBy] = useState('create_time');
  const [isPending, setIsPending] = useState(true);
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allFields, setAllFields] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [filters, setFilters] = useState({ fields: [], skills: [], tags: [] });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isLogged = useSelector(getIsLogged);
  const user = useSelector(getUser);

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
        `http://localhost:5000/project/search?page=${page}&sortBy=${sortBy}&order=${order}`,
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
      const responseFields = await fetch('http://localhost:5000/field');
      const fields = await responseFields.json();

      setAllFields(
        fields.map(field => ({
          value: field.field_id,
          label: field.name,
        }))
      );

      const responseSkills = await fetch('http://localhost:5000/skill');
      const skills = await responseSkills.json();

      setAllSkills(
        skills.map(skill => ({
          value: skill.skill_id,
          label: skill.name,
        }))
      );

      const responseTags = await fetch('http://localhost:5000/tag');
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
                Search for projects
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
                  src={search}
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
                defaultValue="create_time"
                title="Attribute"
                value={sortBy}
                onChange={setSortBy}
                type="radio"
              >
                <MenuItemOption value="create_time">Create Time</MenuItemOption>
                <MenuItemOption value="member_count">
                  Member Count
                </MenuItemOption>
                <MenuItemOption value="credit_count">
                  Credit Count
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
                  project={project}
                  isLogged={isLogged}
                  user={user}
                />
              ))}
            </SimpleGrid>
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
            onChange={page => setPage(page)}
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
