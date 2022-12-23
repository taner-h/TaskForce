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
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  FormControl,
  useToast,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Input,
  Textarea,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { setTasks } from '../reducers/authSlice';
import TaskDetail from './TaskDetail';
import baseUrl from '../data/baseUrl';

export default function TaskCard({
  task,
  isLogged,
  user,
  page,
  taskIds,
  dispatch,
}) {
  const [userIsCommitted, setUserIsCommitted] = useState(false);
  const [commit_count, setCommitCount] = useState(task.commit_count);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [answer, setAnswer] = useState('');
  const toast = useToast();

  async function handleAnswer(event) {
    event.preventDefault();

    const body = {
      userId: user.user_id,
      taskId: task.task_id,
      answer,
    };
    try {
      const response = await fetch(baseUrl + '/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes) {
        toast({
          title: 'Succesfull.',
          description: 'Answer sent succesfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error.',
          description: 'Answer submission failed.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err.message);
    }
    onClose();
  }

  const handleCommit = async () => {
    if (userIsCommitted) {
      let newTaskIds = JSON.parse(JSON.stringify(taskIds));
      newTaskIds.committed = newTaskIds.committed.filter(
        taskId => taskId !== task.task_id
      );

      dispatch(
        setTasks({
          tasks: newTaskIds,
        })
      );

      setCommitCount(commit_count => commit_count - 1);

      try {
        await fetch(baseUrl + `/commit`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.user_id,
            taskId: task.task_id,
          }),
        });
      } catch (err) {
        console.error(err.message);
      }
    } else {
      const newTaskIds = JSON.parse(JSON.stringify(taskIds));
      newTaskIds.committed.push(task.task_id);
      dispatch(
        setTasks({
          tasks: newTaskIds,
        })
      );
      setCommitCount(commit_count => commit_count + 1);

      try {
        await fetch(baseUrl + `/commit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.user_id,
            taskId: task.task_id,
          }),
        });
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  const onDetailOpen = () => {
    setIsDetailOpen(true);
  };

  useEffect(() => {
    setUserIsCommitted(taskIds?.committed.includes(task?.task_id));
  }, [task, taskIds]);

  return (
    <Card
      bgColor={useColorModeValue('gray.200', 'gray.700')}
      align="center"
      variant="elevated"
      direction={'row'}
      maxW="6xl"
    >
      <CardHeader>
        <Tooltip
          hasArrow
          label="The number of people who are currently working on this task."
        >
          <Center
            w="60px"
            h="60px"
            borderRadius="lg"
            bg={useColorModeValue('gray.300', 'gray.800')}
          >
            <Heading color={'blue.400'} fontSize="25px">
              {commit_count > 99 ? '99+' : commit_count}
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
      <Tooltip
        hasArrow
        label={userIsCommitted ? 'Uncommit from task' : 'Commit to task'}
      >
        <IconButton
          disabled={user?.user_id === task.creator_id}
          ml="5"
          mr="2"
          onClick={handleCommit}
          variant="outline"
          colorScheme={userIsCommitted ? 'yellow' : 'blue'}
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
          onClick={onOpen}
        >
          <ChatIcon />
        </IconButton>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Answer to {task.creator_name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <FormControl w={'100%'} l={'100%'} id="credits">
                <Textarea
                  placeholder="Place for your bright idea"
                  rows={4}
                  onChange={event => setAnswer(event.target.value)}
                  value={answer}
                  focusBorderColor="brand.400"
                />
              </FormControl>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAnswer}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <IconButton
        mr="5"
        ml="2"
        bgGradient="linear(to-r, blue.300, blue.600)"
        colorScheme="blue"
        onClick={onDetailOpen}
      >
        <InfoIcon />
      </IconButton>
      <TaskDetail
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        task={task}
        pageName={'mytasks'}
      />
    </Card>
  );
}
