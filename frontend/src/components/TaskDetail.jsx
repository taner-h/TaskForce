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
} from '@chakra-ui/react';
import { ModalCloseButton } from '@chakra-ui/react';
import { USER_BADGE_COLORS } from '../data/options';
import { useSelector } from 'react-redux';
import { getUser } from '../reducers/authSlice';
import { useEffect, useState } from 'react';

export default function DetailModal({
  task,
  isDetailOpen,
  setIsDetailOpen,
  page,
}) {
  const [answers, setAnswers] = useState([]);
  const user = useSelector(getUser);
  const taskId = task.task_id;
  const onDetailClose = () => {
    setIsDetailOpen(false);
  };

  return (
    <>
      <Modal
        size="2xl"
        isCentered
        closeOnOverlayClick={false}
        isOpen={isDetailOpen}
        onClose={onDetailClose}
      >
        <ModalOverlay />
        <ModalContent marginBottom="15px">
          {page === 'mytasks' && (
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
                <TabPanel></TabPanel>
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
