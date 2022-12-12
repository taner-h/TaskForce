import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddFieldModal from '../components/AddFieldModal';
import AddSkillModal from '../components/AddSkillModal';
import Footer from '../components/FooterSmall';
import { getUser } from '../reducers/authSlice';

export default function MyProfile() {
  const user = useSelector(getUser);
  const [skills, setSkills] = useState([]);
  const [fields, setFields] = useState([]);

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
