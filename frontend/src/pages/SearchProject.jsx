import {
  Box,
  Button,
  Center,
  Container,
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
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { project, project2 } from '../data/options';
import search from '../asset/web_search.svg';
import Footer from '../components/FooterSmall';
import { SearchIcon } from '@chakra-ui/icons';

export default function SearchProject() {
  const [values, setValues] = useState([]);
  return (
    <>
      <Box bg={useColorModeValue('gray.50', 'gray.800')}>
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
              Create Time
            </MenuButton>
            <MenuList minWidth="240px">
              <MenuOptionGroup defaultValue="asc" title="Order" type="radio">
                <MenuItemOption value="asc">Ascending</MenuItemOption>
                <MenuItemOption value="desc">Descending</MenuItemOption>
              </MenuOptionGroup>
              <MenuDivider />
              <MenuOptionGroup
                defaultValue="email"
                title="Attribute"
                type="radio"
              >
                <MenuItemOption value="email">Create Time</MenuItemOption>
                <MenuItemOption value="country">Member Count</MenuItemOption>
                <MenuItemOption value="credit">Credit Count</MenuItemOption>
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
          >
            Search
          </Button>
        </Center>
        <Center pt={6} pb="10">
          <SimpleGrid columns={{ base: 1, lg: 2, '2xl': 3 }}>
            <ProjectCard project={project} />
            <ProjectCard project={project2} />
            <ProjectCard project={project} />
            <ProjectCard project={project} />
            <ProjectCard project={project2} />
            <ProjectCard project={project} />
            <ProjectCard project={project} />
            <ProjectCard project={project} />
            <ProjectCard project={project} />
          </SimpleGrid>
        </Center>
      </Box>
      <Footer />
    </>
  );
}
