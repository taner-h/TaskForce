import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputLeftAddon,
  InputGroup,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Image,
  Select,
  Stack,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { getUser } from '../reducers/authSlice';
import coworking from '../asset/co-working.svg';
import team from '../asset/engineering_team.svg';
import world from '../asset/world.svg';
import startup from '../asset/startup.svg';
import community from '../asset/community.svg';
import Footer from '../components/FooterSmall';
import AddFieldModal from '../components/AddFieldModal';
import AddTagModal from '../components/AddTagModal';
import AddSkillModal from '../components/AddSkillModal';

import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export default function CreateProject() {
  const user = useSelector(getUser);

  const [fields, setFields] = useState([]);
  const [skills, setSkills] = useState([]);
  const [tags, setTags] = useState([]);

  return (
    <>
      <Container
        maxW={'8xl'}
        minH={' calc(100vh - 64px)'}
        align={'center'}
        mb="10"
        justify={'center'}
      >
        <Stack
          align={'center'}
          spacing={{ base: 30, md: 20 }}
          py={15}
          // pr={'10'}
          // pb={{ base: 20, md: 28 }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack flex={2} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              align={'center'}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
            >
              <Flex
                flex={1}
                justify={'center'}
                align={'center'}
                position={'relative'}
                mb="10"
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
                    src={community}
                  />
                </Box>
              </Flex>
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
                <Button
                  rounded={'full'}
                  size={'lg'}
                  fontWeight={'normal'}
                  px={6}
                >
                  Create your own
                </Button>
              </Link>
            </Stack>
          </Stack>
          <Flex
            flex={3}
            justify={'center'}
            align={'center'}
            position={'relative'}
            w={'full'}
          >
            <Stack spacing={8} mx={'auto'} w={'full'} px={6} py={12}>
              <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Create a new project</Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                  and team up with people around the world!
                </Text>
              </Stack>
              <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={10}
              >
                <Stack spacing={4}>
                  <HStack spacing={6} justify="center">
                    <FormControl w="50%" id="firstName" isRequired>
                      <FormLabel>Title</FormLabel>
                      <Input
                        type="text"
                        placeholder="The title of your project"
                      />
                    </FormControl>
                  </HStack>

                  <HStack spacing={6} justify="center" align="center">
                    <FormControl>
                      <FormLabel>Git Repository</FormLabel>
                      <InputGroup>
                        <Input
                          type="tel"
                          placeholder="URL for your repository"
                          focusBorderColor="brand.400"
                          rounded="md"
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl w={'60%'} id="credits" isRequired>
                      <FormLabel>Credit to pay</FormLabel>
                      <NumberInput
                        defaultValue={1}
                        min={1}
                        max={user?.credit_count}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Project Type</FormLabel>

                      <Select placeholder="Select option">
                        <option value="option1">Private Team</option>
                        <option value="option2">Open Source</option>
                      </Select>
                    </FormControl>
                  </HStack>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Summary</FormLabel>
                    <Input
                      type="text"
                      placeholder="Give a short summary for you project"
                    />
                  </FormControl>
                  <FormControl id="email" mt={1}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      placeholder="Describe your project in great detail"
                      rows={4}
                      // shadow="sm"
                      focusBorderColor="brand.400"
                    />
                  </FormControl>

                  <Box align="left">
                    <FormLabel>Fields</FormLabel>
                    {fields.map(field => (
                      <Tag
                        size={'md'}
                        key={'md'}
                        m="1"
                        borderRadius="full"
                        variant="solid"
                        colorScheme="gray"
                      >
                        <TagLabel>{field.label}</TagLabel>
                        <TagCloseButton
                          onClick={() => {
                            const temp_fields = fields.filter(i => i !== field);
                            setFields(temp_fields);
                          }}
                        />
                      </Tag>
                    ))}
                    <AddFieldModal setSelectedFields={setFields} />
                  </Box>
                  <Box align="left">
                    <FormLabel>Skills</FormLabel>
                    {skills.map(skill => (
                      <Tag
                        size={'md'}
                        key={'md'}
                        m="1"
                        borderRadius="full"
                        variant="solid"
                        colorScheme="gray"
                      >
                        <TagLabel>{skill.label}</TagLabel>
                        <TagCloseButton
                          onClick={() => {
                            const temp_skills = skills.filter(i => i !== skill);
                            setSkills(temp_skills);
                          }}
                        />
                      </Tag>
                    ))}
                    <AddSkillModal setSelectedSkills={setSkills} />
                  </Box>
                  <Box align="left">
                    <FormLabel>Tags</FormLabel>
                    {tags.map(tag => (
                      <Tag
                        size={'md'}
                        key={'md'}
                        m="1"
                        borderRadius="full"
                        variant="solid"
                        colorScheme="gray"
                      >
                        <TagLabel>{tag.label}</TagLabel>
                        <TagCloseButton
                          onClick={() => {
                            const temp_tags = tags.filter(i => i !== tag);
                            setTags(temp_tags);
                          }}
                        />
                      </Tag>
                    ))}
                    <AddTagModal setSelectedTags={setTags} />
                  </Box>
                  <Box align="center">
                    <FormLabel>Resources</FormLabel>
                    <InputGroup size="sm">
                      <InputLeftAddon
                        bg="gray.50"
                        _dark={{
                          bg: 'gray.800',
                        }}
                        color="gray.500"
                        rounded="md"
                      >
                        https://
                      </InputLeftAddon>
                      <Input
                        type="tel"
                        placeholder="www.example.com"
                        focusBorderColor="brand.400"
                        rounded="md"
                      />
                    </InputGroup>
                  </Box>

                  <Stack pt="8" align="center" spacing={10}>
                    <Button
                      color={'white'}
                      colorScheme="blue"
                      bgGradient="linear(to-r, blue.300, blue.600)"
                      _hover={{
                        bgGradient: 'linear(to-r, blue.200, blue.500)',
                      }}
                    >
                      Create project
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </Stack>
      </Container>
      <Footer />
    </>
  );
}
