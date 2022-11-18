import {
  Box,
  Stack,
  Text,
  Button,
  Heading,
  Tag,
  Badge,
  TagLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';
import { ModalCloseButton } from '@chakra-ui/react';
import { USER_BADGE_COLORS } from '../data/options';

export default function DetailModal({
  project,
  isDetailOpen,
  setIsDetailOpen,
}) {
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
        <ModalContent>
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
                <Badge colorScheme={USER_BADGE_COLORS[project.sub_tier]} m="1">
                  {project.sub_tier}
                </Badge>
              </Box>
            </Stack>
          </ModalBody>

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
