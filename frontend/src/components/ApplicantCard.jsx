import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  Heading,
  IconButton,
  ModalFooter,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import baseUrl from '../data/baseUrl';
import { USER_BADGE_COLORS } from '../data/options';
import React from 'react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

export default function ApplicantCard({
  applicant,
  user,
  project,
  setApplicants,
  applicants,
  members,
  setMembers,
}) {
  const toast = useToast();

  const handleApplicantRemove = async () => {
    try {
      await fetch(
        baseUrl +
          `/application/project/${applicant.project_id}/user/${applicant.user_id}`,
        { method: 'DELETE', headers: { 'Content-Type': 'application/json' } }
      );
      const newApplicants = applicants.applicants.filter(
        app => app.user_id !== applicant.user_id
      );
      setApplicants({ ...applicants, applicants: newApplicants });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleApplicantAccept = async () => {
    const body = {
      userId: applicant.user_id,
      projectId: applicant.project_id,
    };
    try {
      const response = await fetch(baseUrl + `/member`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const res = await response.json();

      if (res) {
        const newApplicants = applicants.applicants.filter(
          app => app.user_id !== applicant.user_id
        );
        setApplicants({ ...applicants, applicants: newApplicants });
        setMembers([
          ...members,
          {
            name: applicant.name,
            surname: applicant.surname,
            member_time: new Date(Date.now()),
          },
        ]);

        toast({
          title: 'Successful.',
          description: 'Applicant accepted successfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error.',
          description: 'Error occured.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Card
      align="center"
      variant="elevated"
      direction={'row'}
      maxW="6xl"
      marginBottom="15px"
      bgColor={useColorModeValue('gray.200', 'gray.800')}
      size="sm"
    >
      <CardHeader>
        <Center
          w="30px"
          h="30px"
          borderRadius="md"
          paddingLeft="25px"
          bg={useColorModeValue('gray.200', 'gray.800')}
        >
          <Avatar
            color={'white'}
            colorScheme="blue"
            bgGradient="linear(to-r, blue.300, blue.600)"
            _hover={{ bgGradient: 'linear(to-r, blue.200, blue.500)' }}
            name={applicant ? `${applicant.name} ${applicant.surname}` : null}
            size={'md'}
          />
        </Center>
      </CardHeader>
      <CardBody>
        <Stack ml="3">
          <Heading size="md" color={useColorModeValue('gray.800', 'gray.300')}>
            {`${applicant.name} ${applicant.surname}`}{' '}
          </Heading>
          <Text fontSize="sm" color={'gray'}>
            application time{' '}
            {new Date(applicant.application_time).toLocaleDateString('en-uk', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}{' '}
          </Text>
        </Stack>
      </CardBody>
      {user?.user_id === project?.creator_id && (
        <>
          <Center height="64px">
            <Divider orientation="vertical" />
          </Center>
          <ModalFooter>
            <Stack direction="horizontal">
              <Tooltip
                hasArrow
                label="You can accept applicants to your project by clicking add button."
              >
                <IconButton
                  colorScheme="green"
                  alignSelf="flex-end"
                  onClick={handleApplicantAccept}
                >
                  <CheckIcon />
                </IconButton>
              </Tooltip>
              <Tooltip
                hasArrow
                label="You can reject applicants by clicking cross button."
              >
                <IconButton
                  colorScheme="red"
                  alignSelf="flex-end"
                  marginLeft="5px"
                  onClick={handleApplicantRemove}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </ModalFooter>
        </>
      )}
    </Card>
  );
}
