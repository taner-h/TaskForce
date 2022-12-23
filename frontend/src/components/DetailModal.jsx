import {
  Box,
  Stack,
  Text,
  Button,
  Center,
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
import Pagination from 'rc-pagination';
import { ModalCloseButton } from '@chakra-ui/react';
import '../asset/pagination.css';
import { USER_BADGE_COLORS } from '../data/options';
import { useSelector } from 'react-redux';
import { getUser } from '../reducers/authSlice';
import { useEffect, useState } from 'react';
import MemberCard from './MemberCard';
import ApplicantCard from './ApplicantCard';
import baseUrl from '../data/baseUrl';

export default function DetailModal({
  project,
  isDetailOpen,
  setIsDetailOpen,
  pageName,
}) {
  const scrollBehavior = 'outside';
  const [page, setPage] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);
  const [members, setMembers] = useState([]);
  const [applicants, setApplicants] = useState({});
  const user = useSelector(getUser);

  const projectId = project.project_id;
  const onDetailClose = () => {
    setIsDetailOpen(false);
  };

  const getMembersInfo = async () => {
    try {
      const response = await fetch(baseUrl + `/member/project/${projectId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const res = await response.json();
      setMembers(res);
    } catch (err) {
      console.error(err.message);
    }
  };
  const getApplicantsInfo = async () => {
    try {
      const response = await fetch(
        baseUrl + `/application/project/${projectId}?page=${page}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const res = await response.json();
      setApplicants(res);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (isDetailOpen) {
      getMembersInfo();
      getApplicantsInfo();
    }
  }, [isDetailOpen]);

  useEffect(() => {
    if (isDetailOpen) {
      getApplicantsInfo();
    }
  }, [page]);

  return (
    <>
      <Modal
        size="2xl"
        scrollBehavior={scrollBehavior}
        isOpen={isDetailOpen}
        onClose={onDetailClose}
      >
        <ModalOverlay />
        <ModalContent marginBottom="15px">
          {pageName === 'myprojects' && (
            <Tabs onChange={index => setTabIndex(index)}>
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
                    {members && members.length !== 0 ? (
                      members.map(mem => (
                        <MemberCard
                          members={members}
                          member={mem}
                          setMembers={setMembers}
                          user={user}
                          project={project}
                        />
                      ))
                    ) : (
                      <Text align="center"> No members </Text>
                    )}
                  </ModalBody>
                </TabPanel>
                {user?.user_id === project?.creator_id && (
                  <>
                    <TabPanel>
                      <ModalCloseButton />
                      <ModalBody>
                        {applicants && Object.keys(applicants).length !== 0 ? (
                          applicants?.applicants.map(app => (
                            <ApplicantCard
                              applicants={applicants}
                              applicant={app}
                              setApplicants={setApplicants}
                              members={members}
                              setMembers={setMembers}
                              user={user}
                              project={project}
                            />
                          ))
                        ) : (
                          <Text align="center"> No applicants </Text>
                        )}
                        <Center pb="10">
                          <Pagination
                            sx={{
                              '.rc-pagination-item': {
                                backgroundColor: 'gray.700',
                                border: '1px solid #d9d9d9',
                              },
                            }}
                            defaultCurrent={1}
                            onChange={page => {
                              setPage(page);
                            }}
                            pageSize={12}
                            current={page}
                            total={applicants?.totalItems}
                          />
                        </Center>
                      </ModalBody>
                    </TabPanel>
                  </>
                )}
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
