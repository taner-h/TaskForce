import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
  Tooltip,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import tasks from '../asset/tasks.svg';
import AddFieldModal from '../components/AddFieldModal';
import AddSkillModal from '../components/AddSkillModal';
import AddTagModal from '../components/AddTagModal';
import Footer from '../components/FooterSmall';
import { getUser } from '../reducers/authSlice';
import baseUrl from '../data/baseUrl';

export default function CreateTask() {
  const user = useSelector(getUser);

  const [fields, setFields] = useState([]);
  const [skills, setSkills] = useState([]);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');
  const [repo, setRepo] = useState('');
  const [creditFee, setCreditFee] = useState(1);
  const [creditReward, setCreditReward] = useState(1);
  const [description, setDescription] = useState('');

  const toast = useToast();

  const handleSubmit = async event => {
    event.preventDefault();

    const body = {
      creatorId: user.user_id,
      title,
      repo,
      description,
      creditFee,
      creditReward,
      fields: fields.map(field => field.value),
      skills: skills.map(skill => skill.value),
      tags: tags.filter(tag => tag.__isNew__ !== true).map(tag => tag.value),
      newTags: tags.filter(tag => tag.__isNew__ === true).map(tag => tag.label),
    };
    try {
      const response = await fetch(baseUrl + '/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes) {
        toast({
          title: 'Succesfull.',
          description: 'Task added succesfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error.',
          description: 'Task creation failed.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.800')}>
      <Container
        maxW={'3xl'}
        minH={' calc(100vh - 64px)'}
        align={'center'}
        mb="10"
        justify={'center'}
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
            <Stack align={'center'}>
              <Heading
                bgGradient="linear(to-r, blue.300, blue.600)"
                bgClip="text"
                fontSize={'5xl'}
              >
                Open a new task
              </Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                and get help from people all around the world!
              </Text>
            </Stack>
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
                  src={tasks}
                />
              </Box>
            </Flex>
          </Stack>
        </Center>
        <Flex
          flex={3}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}
        >
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={10}
          >
            <Stack spacing={4}>
              <HStack spacing={6} justify="center">
                <FormControl id="firstName" isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    type="text"
                    onChange={event => setTitle(event.target.value)}
                    value={title}
                    placeholder="The title of your task"
                  />
                </FormControl>
              </HStack>

              <HStack spacing={6} justify="center" align="center">
                <FormControl>
                  <FormLabel>Git Repository</FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="URL for your repository"
                      focusBorderColor="brand.400"
                      onChange={event => setRepo(event.target.value)}
                      value={repo}
                      rounded="md"
                    />
                  </InputGroup>
                </FormControl>
                <Tooltip
                  hasArrow
                  label="This is the number of credits that you will be paying for the creation of the task."
                >
                  <FormControl w={'40%'} id="credits" isRequired>
                    <FormLabel>Credit fee</FormLabel>
                    <NumberInput
                      defaultValue={1}
                      onChange={setCreditFee}
                      value={creditFee}
                      min={1}
                      max={user?.credit_count - creditReward}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </Tooltip>
                <Tooltip
                  hasArrow
                  label="This is the number of credits that you will pay for the approved answer to your task. The credit is withdrawn at the creation of the task."
                >
                  <FormControl w={'40%'} id="credits" isRequired>
                    <FormLabel>Credit reward</FormLabel>
                    <NumberInput
                      defaultValue={1}
                      onChange={setCreditReward}
                      value={creditReward}
                      min={1}
                      max={user?.credit_count - creditFee}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </Tooltip>
              </HStack>

              <FormControl id="desc" mt={1} isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Describe your task in great detail"
                  rows={4}
                  onChange={event => setDescription(event.target.value)}
                  value={description}
                  // shadow="sm"
                  focusBorderColor="brand.400"
                />
              </FormControl>

              <Box align="left">
                <Flex>
                  <FormLabel>Fields</FormLabel>
                  <AddFieldModal
                    setSelectedFields={setFields}
                    selectedFields={fields}
                  />
                </Flex>
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
                {fields.length === 0 && (
                  <Text fontSize={'sm'} color={'gray.500'}>
                    You have no field selected! Click the plus button above to
                    add related fields to your task.
                  </Text>
                )}
              </Box>
              <Box align="left">
                <Flex>
                  <FormLabel>Skills</FormLabel>
                  <AddSkillModal
                    setSelectedSkills={setSkills}
                    selectedSkills={skills}
                  />
                </Flex>
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
                {skills.length === 0 && (
                  <Text fontSize={'sm'} color={'gray.500'}>
                    You have no skill selected! Click the plus button above to
                    add related skills to your task.
                  </Text>
                )}
              </Box>
              <Box align="left">
                <Flex>
                  <FormLabel>Tags</FormLabel>
                  <AddTagModal setSelectedTags={setTags} selectedTags={tags} />
                </Flex>

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
                {tags.length === 0 && (
                  <Text fontSize={'sm'} color={'gray.500'}>
                    You have no tag selected! Click the plus button above to add
                    related tags to your task.
                  </Text>
                )}
              </Box>

              <Stack pt="8" align="center" spacing={10}>
                <Button
                  color={'white'}
                  colorScheme="blue"
                  onClick={handleSubmit}
                  bgGradient="linear(to-r, blue.300, blue.600)"
                  _hover={{
                    bgGradient: 'linear(to-r, blue.200, blue.500)',
                  }}
                >
                  Create task
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Flex>
      </Container>
      <Footer />
    </Box>
  );
}
