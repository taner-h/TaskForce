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
  project,
  isDetailOpen,
  setIsDetailOpen,
  page,
}) {
  const [member, setMember] = useState([]);
  const [applicant, setApplicant] = useState([]);
  const user = useSelector(getUser);

  const projectId = project.project_id;
  const onDetailClose = () => {
    setIsDetailOpen(false);
  };

  const getMemberInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/member/project/${1}`,
        {
          method: 'GET',
        }
      );

      const res = await response.json();
      setMember(res);
    } catch (err) {
      console.error(err.message);
    }
  };
  const getApplicantInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/application/project/${projectId}`,
        {
          method: 'GET',
        }
      );

      const res = await response.json();
      setApplicant(res);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!member?.length) {
      getMemberInfo();
    }
    // if (!applicant?.length) {
    //   getApplicantInfo();
    // }
  });

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
          {page === 'myprojects' && (
            <Tabs>
              <TabList>
                <Tab>Overview</Tab>
                <Tab>Members</Tab>
                {user?.user_id === project?.creator_id && <Tab>Applicants</Tab>}
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Text
                    textAlign="center"
                    fontFamily={'heading'}
                    fontSize={'4xl'}
                    fontWeight={'700'}
                    colorScheme="blue"
                    bgGradient="linear(to-r, blue.100, blue.600)"
                    bgClip="text"
                    mt={'5'}
                  >
                    {project.project_name}
                  </Text>
                  <Text color={'gray.500'} align="center">
                    {new Date(project.create_time).toDateString()} ·{' '}
                    {project.member_count} members · {project.credit_count}{' '}
                    {project.credit_count === 1 ? 'credit' : 'credits'}
                  </Text>
                  <ModalCloseButton />
                  <ModalBody>
                    <Heading
                      paddingBottom="3px"
                      paddingLeft="5px"
                      fontWeight={'700'}
                      fontSize="xl"
                    >
                      {' '}
                      Summary
                    </Heading>
                    <Text fontSize={'sm'} paddingLeft="5px" align="left">
                      {project.summary}
                    </Text>
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
                      {project.description}
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
                      {project.fields?.map(field => (
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
                    {project.skills?.length !== 0 && (
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
                      {project.skills?.length !== 0 &&
                        project.skills?.map(skill => (
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
                    {project.tags?.length !== 0 && (
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
                      {project.tags?.length !== 0 &&
                        project.tags?.map(tag => (
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
                        {`${project.creator_name} ${project.creator_surname}`}
                        <Badge
                          colorScheme={USER_BADGE_COLORS[project.sub_tier]}
                          m="1"
                        >
                          {project.sub_tier}
                        </Badge>
                      </Box>
                    </Stack>
                  </ModalBody>
                </TabPanel>
                <TabPanel>
                  <ModalCloseButton />
                  <ModalBody>
                    <Heading
                      paddingBottom="3px"
                      paddingLeft="3px"
                      fontWeight={'700'}
                      fontSize="xl"
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      color={useColorModeValue('blue.900', 'blue.200')}
                    >
                      {' '}
                      Members
                    </Heading>
                    <UnorderedList paddingLeft="5px">
                      {member?.length !== 0 &&
                        member?.map(mem => (
                          <ListItem
                            fontSize={'sm'}
                            paddingLeft="5px"
                            fontWeight={'500'}
                            align="left"
                            colorScheme="blue"
                          >
                            {`${mem.name} ${mem.surname}`}{' '}
                            <Badge
                              colorScheme={USER_BADGE_COLORS[project.sub_tier]}
                              m="1"
                            >
                              {project.sub_tier}
                            </Badge>
                          </ListItem>
                        ))}
                    </UnorderedList>
                  </ModalBody>
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
