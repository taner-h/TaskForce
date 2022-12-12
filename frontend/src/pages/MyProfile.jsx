import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Tag,
  TagCloseButton,
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

export default function MyProfile() {
  const user = useSelector(getUser);
  const [skills, setSkills] = useState(
      user.skills.map(skill => ({ label: skill.name, value: skill.skill_id }))
  );
  const [fields, setFields] = useState(
      user.fields.map(field => ({ label: field.name, value: field.field_id }))
  );

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
            <Box
                rounded={'lg'}
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
                    <Box
                        display="inline-block"
                        mr={3}
                        //value={name}
                        // onChange={event => setName(event.target.value)}
                    >
                      {`${user.name} ${user.surname}`}
                    </Box>
                    <Popover>
                      <PopoverTrigger>
                        <IconButton size="xs" icon={<EditIcon />} />
                      </PopoverTrigger>
                    </Popover>
                  </Box>
                </HStack>
              </Stack>
              <Box align="left">
                <Heading size={'md'} paddingBottom="5px">
                  Skills
                </Heading>

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
          </Stack>
        </Flex>
        <Footer />
      </>
  );
}
