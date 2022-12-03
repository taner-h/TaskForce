import React from 'react';
import {
  Card,
  Heading,
  Stack,
  Box,
  Center,
  Tag,
  Stat,
  TagLabel,
  StatLabel,
  IconButton,
  StatNumber,
  Badge,
  StatHelpText,
  StatArrow,
  StatGroup,
  Tooltip,
  Text,
  CardHeader,
  Button,
  Divider,
  ButtonGroup,
  useColorModeValue,
  CardBody,
  CardFooter,
  StackDivider,
} from '@chakra-ui/react';
import { ChatIcon, InfoIcon, StarIcon } from '@chakra-ui/icons';
export default function TaskCard() {
  const task = {
    task_id: 25,
    creator_id: 91,
    title: 'Can you center my div?',
    description:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    repo: 'https://github.com/taner-h/TaskForce',
    credit_fee: 3,
    credit_reward: 3,
    commit_count: 10,
    answer_count: 9,
    creator_name: 'Carla',
    creator_surname: 'Scathard',
    create_time: '2022-12-03T08:48:25.566Z',
    fields: [
      {
        project_id: 25,
        field_id: 1,
        name: 'Web Development',
      },
      {
        project_id: 25,
        field_id: 7,
        name: 'Desktop Application Development',
      },
      {
        project_id: 25,
        field_id: 11,
        name: 'Deep Learning',
      },
    ],
    skills: [
      {
        project_id: 25,
        skill_id: 1,
        name: 'Front-End Developer',
      },
    ],
    tags: [
      {
        project_id: 25,
        tag_id: 3,
        name: 'JavaScript',
      },
      {
        project_id: 25,
        tag_id: 16,
        name: 'Figma',
      },
      {
        project_id: 25,
        tag_id: 16,
        name: 'React',
      },
      {
        project_id: 25,
        tag_id: 16,
        name: 'CSS',
      },
    ],
  };

  return (
    <Card align="center" m="10" direction={'row'} maxW="6xl">
      <CardHeader>
        <Tooltip
          hasArrow
          label="The number of people who are currently working on this task."
        >
          <Center
            w="60px"
            h="60px"
            borderRadius="lg"
            bg={useColorModeValue('gray.200', 'gray.800')}
          >
            <Heading
              color={useColorModeValue('blue.400', 'blue.400')}
              fontSize="25px"
            >
              {task.commit_count > 99 ? '99+' : task.commit_count}
            </Heading>
          </Center>
        </Tooltip>
      </CardHeader>
      <CardBody>
        <Stack spacing="2">
          <Stack direction="row" align="center">
            <Heading noOfLines={1} size="md">
              {' '}
              {task.title}
            </Heading>
            <Badge colorScheme="green">NEW</Badge>
            {task.commit_count > 9 && <Badge colorScheme="red">HOT</Badge>}
          </Stack>
          <Text
            noOfLines={1}
            // height="24px"
            color={useColorModeValue('gray.600', 'gray.400')}
            // overflow="hidden"
            justify="center"
          >
            {task?.tags.map(skill => (
              <Tag
                size={'sm'}
                m="1"
                borderRadius="full"
                variant="subtle"
                colorScheme="gray"
              >
                <TagLabel>{'#' + skill.name}</TagLabel>
              </Tag>
            ))}
            {' · '}
            {task.credit_reward} credits · {task.answer_count} answers
            {' · at '}
            {new Date(task.create_time).toLocaleDateString('en-uk', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}{' '}
            {' · by '}
            {`${task.creator_name} ${task.creator_surname}`}
          </Text>
        </Stack>
      </CardBody>
      <Center height="64px">
        <Divider orientation="vertical" />
      </Center>
      <Tooltip hasArrow label="Commit to task">
        <IconButton ml="5" variant="outline" colorScheme="blue">
          <StarIcon />
        </IconButton>
      </Tooltip>
      <Tooltip hasArrow label="Answer task">
        <IconButton mx="3" variant="outline" colorScheme="blue">
          <ChatIcon />
        </IconButton>
      </Tooltip>
      <IconButton mr="5" colorScheme="blue">
        <InfoIcon />
      </IconButton>
    </Card>
  );
}
