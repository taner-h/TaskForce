// import Image from 'next/image';
import {
  Box,
  Center,
  Heading,
  Image,
  Badge,
  Flex,
  Text,
  Button,
  Tag,
  TagLabel,
  TagCloseButton,
  Container,
  Stack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
// import { project } from '../data/options';
import { USER_BADGE_COLORS } from '../data/options';

export default function ProjectCard({ project }) {
  const skills = [
    'Mobile App Development',
    'Web Development',
    'Web Development',
    'Web Development',
    'Web Development',
    'Game Development',
  ];

  const tags = [
    'React.js',
    'JavaScript',
    'node.js',
    'Redux',
    'PostgreSQL',
    'ChakraUI',
  ];
  return (
    <Flex>
      <Box
        maxW={{ base: '%90', sm: '600px', lg: '450px' }}
        // minH="500px"
        w={'full'}
        m="4"
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        // position="relative"
        p={6}
        justify="center"
      >
        <Stack>
          <Text
            color={'blue.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
          >
            {/* {project.fields.map(field => field.name).join(', ')} */}
            {project.fields[0]?.name}
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            {project.project_name}
          </Heading>
          <Text color={'gray.500'}>
            {project.summary || project.description}
          </Text>
          <Box align="left">
            {project.skills?.map(skill => (
              <Tag
                size={'sm'}
                m="1"
                borderRadius="full"
                variant="subtle"
                colorScheme="gray"
              >
                <TagLabel>{skill.name}</TagLabel>
              </Tag>
            ))}
            {project.skills?.length > 5 && '...'}
          </Box>
          <Box align="left">
            {project.tags?.map(tag => (
              <Tag
                size={'sm'}
                m="1"
                borderRadius="full"
                variant="outline"
                colorScheme="gray"
              >
                <TagLabel>{'#' + tag.name}</TagLabel>
              </Tag>
            ))}
          </Box>
        </Stack>
        <Box>
          <Stack mt={6} direction={'row'} spacing={4}>
            <Avatar
              color={'white'}
              colorScheme="blue"
              bgGradient="linear(to-r, blue.300, blue.600)"
              _hover={{ bgGradient: 'linear(to-r, blue.200, blue.500)' }}
              name={`${project.creator_name} ${project.creator_surname}`}
              size={'md'}
            />
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text fontWeight={600}>
                {`${project.creator_name} ${project.creator_surname}`}
                <Badge
                  colorScheme={USER_BADGE_COLORS[project.creator_sub_tier]}
                  m="1"
                >
                  {project.creator_sub_tier}
                </Badge>
              </Text>

              <Text color={'gray.500'}>
                {new Date(project.create_time).toDateString()} ·{' '}
                {project.member_count} members
              </Text>
            </Stack>
          </Stack>
          <Stack mt={3} direction={'row'} justify={'center'}>
            <Button variant={'outline'} colorScheme="blue">
              See more
            </Button>
            <Button
              variant={'solid'}
              colorScheme="blue"
              bgGradient="linear(to-r, blue.300, blue.600)"
            >
              Apply
            </Button>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
}
