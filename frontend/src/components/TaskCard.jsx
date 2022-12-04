import { ChatIcon, InfoIcon, StarIcon } from '@chakra-ui/icons';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  Heading,
  IconButton,
  Stack,
  Tag,
  TagLabel,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

export default function TaskCard({ task, isLogged, user, page }) {
  return (
    <Card align="center" variant="elevated" direction={'row'} maxW="6xl">
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
            <Heading color={'blue.400'} fontSize="25px">
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
            color={useColorModeValue('gray.600', 'gray.400')}
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
        <IconButton
          disabled={user?.user_id === task.creator_id}
          ml="5"
          mr="2"
          variant="outline"
          colorScheme="blue"
        >
          <StarIcon />
        </IconButton>
      </Tooltip>
      <Tooltip hasArrow label="Answer task">
        <IconButton
          disabled={user?.user_id === task.creator_id}
          mx="1"
          variant="outline"
          colorScheme="blue"
        >
          <ChatIcon />
        </IconButton>
      </Tooltip>

      <IconButton
        mr="5"
        ml="2"
        bgGradient="linear(to-r, blue.300, blue.600)"
        colorScheme="blue"
      >
        <InfoIcon />
      </IconButton>
    </Card>
  );
}
