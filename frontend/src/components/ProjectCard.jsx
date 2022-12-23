// import Image from 'next/image';
import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Grid,
  GridItem,
  Image,
  Badge,
  Flex,
  Text,
  Button,
  Tag,
  TagLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  TagCloseButton,
  Container,
  FormControl,
  FormLabel,
  Stack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Avatar,
  useColorModeValue,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { USER_BADGE_COLORS } from '../data/options';
import DetailModal from './DetailModal';
import React, { useState } from 'react';
import baseUrl from '../data/baseUrl';

export default function ProjectCard({ project, isLogged, user, pageName }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [credit, setCredit] = useState(1);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleApply = async () => {
    const body = {
      userId: user.user_id,
      projectId: project.project_id,
      creditCount: credit,
    };

    try {
      await fetch(baseUrl + '/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      toast({
        title: `Application succesful.`,
        description: 'You have succesfully applied to project.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      onClose();
    } catch (err) {
      toast({
        title: `Application failed.`,
        description: 'You cannot apply to this project.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      console.error(err.message);
    }
  };

  const onDetailOpen = () => {
    setIsDetailOpen(true);
  };

  return (
    <Flex>
      <Box
        maxW={{ base: '%90', sm: '600px', lg: '450px' }}
        // minH="500px"
        w={'full'}
        m="4"
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'2xl'}
        rounded={'md'}
        position="relative"
        p={6}
        justify="center"
      >
        <Stack pb="64px">
          <Grid templateColumns="repeat(6, 1fr)">
            <GridItem colSpan={5}>
              <Text
                color={'blue.500'}
                textTransform={'uppercase'}
                fontWeight={800}
                fontSize={'sm'}
                letterSpacing={1.1}
                mb="2"
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
            </GridItem>
            <GridItem colSpan={1}>
              {pageName !== 'myprojects' && (
                <Button
                  variant={'solid'}
                  colorScheme="blue"
                  bgGradient="linear(to-r, blue.300, blue.600)"
                  onClick={() => {
                    if (!isLogged) {
                      toast({
                        title: `You're not logged in.`,
                        description: 'Please log in or register first.',
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                      });
                    } else {
                      onOpen();
                    }
                  }}
                >
                  Apply
                </Button>
              )}
            </GridItem>
          </Grid>

          <Text color={useColorModeValue('gray.600', 'gray.400')}>
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
        <Box position={'absolute'} bottom="0" mb="5">
          <Grid
            templateColumns="repeat(6, 1fr)"
            mt={6}
            direction={'row'}
            spacing={4}
            gap={5}
            w="full"
          >
            <GridItem colSpan={1}>
              <Avatar
                color={'white'}
                colorScheme="blue"
                bgGradient="linear(to-r, blue.300, blue.600)"
                _hover={{ bgGradient: 'linear(to-r, blue.200, blue.500)' }}
                name={`${project.creator_name} ${project.creator_surname}`}
                size={'md'}
              />
            </GridItem>
            <GridItem colSpan={4}>
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

                <Text color={useColorModeValue('gray.600', 'gray.400')}>
                  {new Date(project.create_time).toLocaleDateString('en-uk', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}{' '}
                  · {project.member_count} members
                </Text>
              </Stack>
            </GridItem>
            <GridItem colSpan={1}>
              <Button
                onClick={onDetailOpen}
                variant={'outline'}
                mr="5"
                colorScheme="blue"
              >
                See More
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </Box>
      <DetailModal
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        project={project}
        pageName={'myprojects'}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Apply to {project.project_name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <FormControl w={'50%'} id="credits">
                <FormLabel>Credit to pay</FormLabel>
                <NumberInput
                  defaultValue={1}
                  min={1}
                  value={credit}
                  onChange={setCredit}
                  max={user?.credit_count}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleApply}>
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
