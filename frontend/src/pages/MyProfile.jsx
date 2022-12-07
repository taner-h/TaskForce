import {
  Box,
  Button,
  Flex,
  Center,
  Heading,
  Stack,
  Tag,
  Spinner,
  PopoverContent,
  FormControl,
  PopoverArrow,
  PopoverCloseButton,
  Input,
  FormLabel,
  IconButton,
  TagLabel,
  Popover,
  PopoverTrigger,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddFieldModal from '../components/AddFieldModal';
import AddSkillModal from '../components/AddSkillModal';
import Footer from '../components/FooterSmall';
import { getUser } from '../reducers/authSlice';
import { EditIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';

export default function MyProfile() {
  const user = useSelector(getUser);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [skills, setSkills] = useState([]);
  const [fields, setFields] = useState([]);
  const fieldLength = user?.fields.length;
  const skillLength = user?.skills.length;
  const nameLength = user?.name.length;
  const surnameLength = user?.surname.length;
  useEffect(() => {
    if (skillLength)
      setSkills(
        user.skills.map(skill => ({
          label: skill.name,
          value: skill?.skill_id,
        }))
      );
    if (fieldLength)
      setFields(
        user.fields.map(field => ({
          label: field.name,
          value: field?.field_id,
        }))
      );
    if (nameLength) setName(user.name);
    if (surnameLength) setSurname(user.surname);
  }, [skillLength, fieldLength, nameLength, surnameLength]);

  return (
    <>
      <Flex
        minH={' calc(100vh - 120px)'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'left'}>
            <Heading fontSize={'4xl'}>This is your profile</Heading>
            <Text fontSize={'sm'} color={'gray.600'}>
              In order to get better recommendations we strongly suggest you to
              fill the favorite field and skills sections below
            </Text>
          </Stack>
          <Center>
            {!skillLength && !fieldLength && (
              <Spinner
                thickness="4px"
                speed="0.65s"
                mt="10"
                color="blue.500"
                size="xl"
              />
            )}
          </Center>
          {skillLength && fieldLength && (
            <Box
              rounded={'lg'}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
            >
              <Stack spacing={4}>
                <HStack>
                  <Box paddingBottom="10px">
                    <Heading size={'sm'} paddingBottom="5px">
                      Name
                    </Heading>
                    <Box display="inline-block" mr={3}>
                      {nameLength && surnameLength && `${name} ${surname}`}
                    </Box>
                    <Popover placement="right" closeOnBlur={true}>
                      <PopoverTrigger>
                        <IconButton size="sm" icon={<EditIcon />} />
                      </PopoverTrigger>
                      <PopoverContent p={5}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <FormControl id="name">
                          <FormLabel>Name</FormLabel>
                          <Input
                            autoComplete="off"
                            type="name"
                            value={name}
                            colorScheme="gray"
                            w={'200px'}
                            marginBottom="5px"
                            onChange={event => setName(event.target.value)}
                          />
                        </FormControl>
                        <FormControl id="surname">
                          <FormLabel>Surname</FormLabel>

                          <Input
                            autoComplete="off"
                            type="surname"
                            value={surname}
                            colorScheme="gray"
                            w={'200px'}
                            marginBottom="15px"
                            onChange={event => setSurname(event.target.value)}
                          />
                        </FormControl>
                      </PopoverContent>
                    </Popover>
                  </Box>
                </HStack>
              </Stack>
              <Box align="left">
                <Heading size={'md'} paddingBottom="5px">
                  Skills
                </Heading>

                {skills &&
                  skills.map(skill => (
                    <Tag
                      size={'md'}
                      key={'md'}
                      m="1"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="gray"
                    >
                      <TagLabel>{skill.label}</TagLabel>
                    </Tag>
                  ))}
                <AddSkillModal
                  setSelectedSkills={setSkills}
                  selectedSkills={skills}
                  page="profile"
                />
              </Box>
              <Box align="left">
                <Heading paddingBottom={'5px'} paddingTop={'5px'} size={'md'}>
                  Fields
                </Heading>
                {fields &&
                  fields.map(field => (
                    <Tag
                      size={'md'}
                      key={'md'}
                      m="1"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="gray"
                    >
                      <TagLabel>{field.label}</TagLabel>
                    </Tag>
                  ))}
                <AddFieldModal
                  setSelectedFields={setFields}
                  selectedFields={fields}
                  page="profile"
                />
              </Box>
              <Stack
                paddingTop={'20px'}
                paddingLeft="80%"
                allign="right"
                width="100%"
              >
                <Button
                  size={'sm'}
                  allign="right"
                  borderRadius="5px"
                  color={'white'}
                  colorScheme="blue"
                  bgGradient="linear(to-r, blue.300, blue.600)"
                  _hover={{
                    bgGradient: 'linear(to-r, blue.200, blue.500)',
                  }}
                >
                  Submit
                </Button>
              </Stack>
            </Box>
          )}
        </Stack>
      </Flex>
      <Footer />
    </>
  );
}
