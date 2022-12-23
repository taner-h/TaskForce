import {
  Box,
  Stack,
  Text,
  Button,
  Heading,
  Tag,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  TagLabel,
  Modal,
  ModalOverlay,
  useColorModeValue,
  ModalContent,
  ListItem,
  UnorderedList,
  ModalFooter,
  ModalBody,
  Card,
  CardHeader,
  Center,
  CardBody,
} from '@chakra-ui/react';
import { ModalCloseButton } from '@chakra-ui/react';
import { USER_BADGE_COLORS } from '../data/options';
import { useSelector } from 'react-redux';
import { getUser } from '../reducers/authSlice';
import { useEffect, useState } from 'react';
import baseUrl from '../data/baseUrl';

export default function TaskDetail({
  task,
  isDetailOpen,
  setIsDetailOpen,
  pageName,
}) {
  const [answers, setAnswers] = useState([]);
  const user = useSelector(getUser);
  const taskId = task.task_id;
  const onDetailClose = () => {
    setIsDetailOpen(false);
  };

  const answerCardBackgroundColor = useColorModeValue('gray.200', 'gray.800');
  const answerTextColor = useColorModeValue('gray.600', 'gray.400');

  const getAnswers = async () => {
    if (isDetailOpen === true) {
      try {
        await fetch(baseUrl + `/answer/${task.task_id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setAnswers(data);
          });
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  useEffect(() => {
    getAnswers();
  }, [isDetailOpen]);

  return (
    <>
      <Modal
        size="2xl"
        closeOnOverlayClick={false}
        isOpen={isDetailOpen}
        onClose={onDetailClose}
        scrollBehavior="outside"
      >
        <ModalOverlay />
        <ModalContent marginBottom="15px">
          {pageName === 'mytasks' && (
            <Tabs>
              <TabList>
                <Tab>Overview</Tab>
                <Tab>Answers</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Text
                    textAlign="center"
                    fontFamily={'heading'}
                    fontSize={'1xl'}
                    fontWeight={'700'}
                    colorScheme="blue"
                    bgGradient="linear(to-r, blue.100, blue.600)"
                    bgClip="text"
                    mt={'5'}
                  >
                    {task.title}
                  </Text>
                  <Text color={'gray.500'} align="center">
                    {new Date(task.create_time).toDateString()} ·{' '}
                    {task.credit_reward}
                    {task.credit_reward === 1
                      ? ' credit reward'
                      : ' credits reward'}
                  </Text>
                  <ModalCloseButton />
                  <ModalBody>
                    <Heading
                      paddingBottom="3px"
                      paddingTop="10px"
                      paddingLeft="5px"
                      fontWeight={'700'}
                      fontSize="xl"
                    >
                      {' '}
                      Description
                    </Heading>
                    <Text fontSize={'sm'} paddingLeft="5px" align="left">
                      {task.description}
                    </Text>
                    <Heading
                      paddingBottom="3px"
                      paddingTop="10px"
                      paddingLeft="5px"
                      fontWeight={'700'}
                      fontSize="xl"
                    >
                      {' '}
                      Fields
                    </Heading>
                    <Box align="left">
                      {task.fields?.map(field => (
                        <Tag
                          size={'sm'}
                          fontWeight={'600'}
                          m="1"
                          borderRadius="full"
                          variant="subtle"
                          colorScheme="blue"
                        >
                          <TagLabel>{field.name}</TagLabel>
                        </Tag>
                      ))}
                    </Box>
                    {task.skills?.length !== 0 && (
                      <Heading
                        paddingBottom="3px"
                        paddingTop="10px"
                        paddingLeft="5px"
                        fontWeight={'700'}
                        fontSize="xl"
                      >
                        Skills
                      </Heading>
                    )}
                    <Box align="left">
                      {task.skills?.length !== 0 &&
                        task.skills?.map(skill => (
                          <Tag
                            size={'sm'}
                            fontWeight={'600'}
                            m="1"
                            borderRadius="full"
                            variant="subtle"
                            colorScheme="blue"
                          >
                            <TagLabel>{skill.name}</TagLabel>
                          </Tag>
                        ))}
                    </Box>
                    {task.tags?.length !== 0 && (
                      <Heading
                        paddingBottom="3px"
                        paddingTop="10px"
                        paddingLeft="5px"
                        fontWeight={'700'}
                        fontSize="xl"
                      >
                        {' '}
                        Tags
                      </Heading>
                    )}
                    <Box align="left">
                      {task.tags?.length !== 0 &&
                        task.tags?.map(tag => (
                          <Tag
                            size={'sm'}
                            fontWeight={'600'}
                            m="1"
                            borderRadius="full"
                            variant="subtle"
                            colorScheme="blue"
                          >
                            <TagLabel>{'#' + tag.name}</TagLabel>
                          </Tag>
                        ))}
                    </Box>
                    <Heading
                      paddingBottom="3px"
                      paddingTop="10px"
                      paddingLeft="5px"
                      fontWeight={'700'}
                      fontSize="xl"
                    >
                      {' '}
                      Creator
                    </Heading>

                    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="sm"
                        py="1"
                        textTransform="uppercase"
                        ml="2"
                      >
                        {`${task.creator_name} ${task.creator_surname}`}
                        <Badge
                          colorScheme={USER_BADGE_COLORS[task.sub_tier]}
                          m="1"
                        >
                          {task.sub_tier}
                        </Badge>
                      </Box>
                    </Stack>
                  </ModalBody>
                </TabPanel>
                <TabPanel>
                  {answers.map(answer => (
                    <Card
                      bgColor={answerCardBackgroundColor}
                      align="center"
                      variant="elevated"
                      // direction={'row'}
                      maxW="6xl"
                      my="5"
                    >
                      <CardBody>
                        <Stack spacing="2">
                          <Stack direction="row" align="center">
                            <Heading noOfLines={1} size="md">
                              {`${answer.responder_name} ${answer.responder_surname}`}
                            </Heading>
                            <Text noOfLines={1} justify="center">
                              {' answered at '}
                              {new Date(task.create_time).toLocaleDateString(
                                'en-uk',
                                {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                }
                              )}{' '}
                            </Text>
                          </Stack>

                          <Text color={answerTextColor} justify="center">
                            {answer.answer}
                          </Text>
                        </Stack>
                      </CardBody>
                    </Card>
                  ))}
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}

          <ModalFooter>
            <Button
              fontWeight={'700'}
              onClick={onDetailClose}
              colorScheme="blue"
              mr={3}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
