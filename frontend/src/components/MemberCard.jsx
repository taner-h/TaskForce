import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
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
} from '@chakra-ui/react';
import { USER_BADGE_COLORS } from '../data/options';
import React from 'react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import baseUrl from '../data/baseUrl';

export default function MemberCard({
  member,
  user,
  project,
  setMembers,
  members,
}) {
  const handleMemberRemove = async () => {
    try {
      await fetch(
        baseUrl + `/member/project/${member.project_id}/user/${member.user_id}`,
        { method: 'DELETE', headers: { 'Content-Type': 'application/json' } }
      );

      setMembers(members.filter(mem => mem.user_id !== member.user_id));
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
            name={member ? `${member.name} ${member.surname}` : null}
            size={'md'}
          />
        </Center>
      </CardHeader>
      <CardBody>
        <Stack ml="3">
          <Heading size="md" color={useColorModeValue('gray.800', 'gray.300')}>
            {`${member.name} ${member.surname}`}{' '}
          </Heading>
          <Text fontSize="sm" color={'gray'}>
            member since{' '}
            {new Date(member.member_time).toLocaleDateString('en-uk', {
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
          <CardFooter>
            <Tooltip
              hasArrow
              label="You can remove your project's member by clicking delete button."
            >
              <IconButton
                colorScheme="red"
                alignSelf="flex-end"
                onClick={handleMemberRemove}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
