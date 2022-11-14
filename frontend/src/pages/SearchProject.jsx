import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
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
import convertSortName from '../utils/convertSortName';

export default function SearchProject() {
  const [values, setValues] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState({});
  const [order, setOrder] = useState('DESC');
  const [sortBy, setSortBy] = useState('create_time');
  const [isPending, setIsPending] = useState(true);

  const getPageContent = async () => {
    setIsPending(true);

    try {
      const response = await fetch(
        `http://localhost:5000/project/search?page=${page}&sortBy=${sortBy}&order=${order}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        }
      );

      const res = await response.json();
      setContent(res);
      setIsPending(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getPageContent();
  }, [page]);

  const onPageChange = page => {
    setPage(page);
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
          <Text
            color={useColorModeValue('gray.600', 'gray.500')}
            fontSize={'lg'}
            fontWeight={'600'}
            align="center"
            justifyContent="center"
          >
            Filter by
          </Text>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} mx="3" colorScheme="gray">
              Fields
            </MenuButton>
            <MenuList minWidth="240px">
              <MenuOptionGroup
                // title="Fields"
                type="checkbox"
                value={values}
                onChange={setValues}
              >
                <MenuItemOption value="email">Email</MenuItemOption>
                <MenuItemOption value="phone">Phone</MenuItemOption>
                <MenuItemOption value="country">Country</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} mx="3" colorScheme="gray">
              Skills
            </MenuButton>
            <MenuList minWidth="240px">
              <MenuOptionGroup
                // title="Fields"
                type="checkbox"
              >
                <MenuItemOption value="email">Email</MenuItemOption>
                <MenuItemOption value="phone">Phone</MenuItemOption>
                <MenuItemOption value="country">Country</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} mx="3" colorScheme="gray">
              Tags
            </MenuButton>
            <MenuList minWidth="240px">
              <MenuOptionGroup
                // title="Fields"
                type="checkbox"
              >
                <MenuItemOption value="email">Email</MenuItemOption>
                <MenuItemOption value="phone">Phone</MenuItemOption>
                <MenuItemOption value="country">Country</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>

          <Text
            color={useColorModeValue('gray.600', 'gray.500')}
            fontSize={'lg'}
            fontWeight={'600'}
            align="center"
            justifyContent="center"
            ml="5"
          >
            Sort by
          </Text>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} mx="3" colorScheme="gray">
              {convertSortName(sortBy)}
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
          <Button
            mt={'10'}
            color={'white'}
            colorScheme="blue"
            bgGradient="linear(to-r, blue.300, blue.600)"
            _hover={{ bgGradient: 'linear(to-r, blue.200, blue.500)' }}
            leftIcon={<SearchIcon />}
            onClick={getPageContent}
          >
            Search
          </Button>
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
                <ProjectCard project={project} />
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
            onChange={onPageChange}
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
