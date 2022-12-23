import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  Tag,
  TagLabel,
  useDisclosure,
  Textarea,
  InputRightElement,
  InputLeftAddon,
  useToast,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ViewIcon, ViewOffIcon, AddIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import {
  setAuth,
  setUser,
  fetchUser,
  setTasks,
  setNotifications,
  setProjects,
} from '../reducers/authSlice';
import { useDispatch } from 'react-redux';
import { Select } from 'chakra-react-select';
import baseUrl from '../data/baseUrl';
import Footer from '../components/FooterSmall';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [bio, setBio] = useState('');
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [allFields, setAllFields] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const {
    isOpen: isOpenFields,
    onOpen: onOpenFields,
    onClose: onCloseFields,
  } = useDisclosure();
  const {
    isOpen: isOpenSkills,
    onOpen: onOpenSkills,
    onClose: onCloseSkills,
  } = useDisclosure();

  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getOptions();
  }, []);

  const getOptions = async () => {
    try {
      const responseFields = await fetch(baseUrl + '/field');
      const fields = await responseFields.json();

      setAllFields(
        fields.map(field => ({
          value: field.field_id,
          label: field.name,
        }))
      );

      const responseSkills = await fetch(baseUrl + 'skill');
      const skills = await responseSkills.json();

      setAllSkills(
        skills.map(skill => ({
          value: skill.skill_id,
          label: skill.name,
        }))
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const body = {
      email,
      password,
      name,
      surname,
      portfolio,
      linkedin,
      github,
      bio,
      fields: selectedFields.map(field => field.value),
      skills: selectedSkills.map(skill => skill.value),
    };
    try {
      const response = await fetch(baseUrl + '/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.token) {
        dispatch(
          setAuth({
            token: parseRes.token,
            isLogged: true,
          })
        );
        localStorage.setItem('token', parseRes.token);
        // localStorage.setItem('userId', parseRes.userId);
        navigate('/');

        toast({
          title: 'Register successful.',
          description: 'Welcome to TaskForce!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });

        const user = await dispatch(fetchUser(parseRes.userId));

        dispatch(
          setUser({
            user: user.payload,
          })
        );

        dispatch(
          setProjects({
            projects: {
              creator: [],
              member: [],
              applicant: [],
              invitee: [],
            },
          })
        );

        dispatch(
          setTasks({
            tasks: {
              created: [],
              answered: [],
              committed: [],
            },
          })
        );

        dispatch(
          setNotifications({
            notifications: [],
          })
        );
      } else {
        toast({
          title: 'Register failed.',
          description: 'Make sure that email is valid.',
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
    <>
      <Flex
        minH={' calc(100vh - 120px)'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'2xl'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Register for free
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              or{' '}
              <Link to="/pricing" style={{ color: '#4299E1' }}>
                see
              </Link>{' '}
              our other offers!
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <FormControl w="100%" id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={event => setName(event.target.value)}
                  />
                </FormControl>

                <FormControl w="100%" id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={surname}
                    onChange={event => setSurname(event.target.value)}
                  />
                </FormControl>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="website">
                <FormLabel optionalIndicator={true}>Personal Website</FormLabel>
                <InputGroup size="sm">
                  <InputLeftAddon
                    bg="gray.50"
                    _dark={{
                      bg: 'gray.800',
                    }}
                    color="gray.500"
                    rounded="md"
                  >
                    https://
                  </InputLeftAddon>
                  <Input
                    type="tel"
                    value={portfolio}
                    placeholder="www.example.com"
                    focusBorderColor="brand.400"
                    rounded="md"
                    onChange={event => setPortfolio(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>LinkedIn</FormLabel>
                <InputGroup size="sm">
                  <InputLeftAddon
                    bg="gray.50"
                    _dark={{
                      bg: 'gray.800',
                    }}
                    color="gray.500"
                    rounded="md"
                  >
                    linkedin.com/in/
                  </InputLeftAddon>
                  <Input
                    type="tel"
                    placeholder="accountUrl"
                    value={linkedin}
                    onChange={event => setLinkedin(event.target.value)}
                    focusBorderColor="brand.400"
                    rounded="md"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>GitHub</FormLabel>
                <InputGroup size="sm">
                  <InputLeftAddon
                    bg="gray.50"
                    _dark={{
                      bg: 'gray.800',
                    }}
                    color="gray.500"
                    rounded="md"
                  >
                    github.com/
                  </InputLeftAddon>
                  <Input
                    type="tel"
                    value={github}
                    onChange={event => setGithub(event.target.value)}
                    placeholder="accountUrl"
                    focusBorderColor="brand.400"
                    rounded="md"
                  />
                </InputGroup>
              </FormControl>

              <FormControl id="email" mt={1}>
                <Flex>
                  <FormLabel>Favorite Fields</FormLabel>
                  <IconButton
                    size={'xs'}
                    onClick={onOpenFields}
                    variant="solid"
                    colorScheme="blue"
                    rounded="full"
                  >
                    <AddIcon boxSize={2.5} />
                  </IconButton>
                </Flex>
                <Modal
                  isOpen={isOpenFields}
                  onClose={onCloseFields}
                  size={'xl'}
                  closeOnOverlayClick={false}
                  isCentered
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Add your favorite fields</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <FormControl p={4}>
                        <FormLabel>Fields</FormLabel>
                        <Select
                          isMulti
                          options={allFields}
                          value={selectedFields}
                          onChange={setSelectedFields}
                          variant="flushed"
                          placeholder="Select fields to filter..."
                          closeMenuOnSelect={false}
                          selectedOptionStyle="check"
                          tagVariant="subtle"
                          hideSelectedOptions={false}
                        />
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onCloseFields}>
                        Save
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                <Box alignItems={'center'} justifyContent="center">
                  {selectedFields.length === 0 && (
                    <Text fontSize={'sm'} color={'gray.500'}>
                      You have no favorite fields selected! Click the plus
                      button above to add your favorite fields!
                    </Text>
                  )}

                  {selectedFields.map(field => (
                    <Tag
                      size={'sm'}
                      m="1"
                      borderRadius="full"
                      variant="subtle"
                      colorScheme="gray"
                    >
                      <TagLabel>{field.label}</TagLabel>
                    </Tag>
                  ))}
                </Box>
              </FormControl>

              <FormControl id="email" mt={1}>
                <Flex>
                  <FormLabel>Favorite Skills</FormLabel>
                  <IconButton
                    size={'xs'}
                    onClick={onOpenSkills}
                    variant="solid"
                    colorScheme="blue"
                    rounded="full"
                  >
                    <AddIcon boxSize={2.5} />
                  </IconButton>
                </Flex>
                <Modal
                  isOpen={isOpenSkills}
                  onClose={onCloseSkills}
                  size={'xl'}
                  closeOnOverlayClick={false}
                  isCentered
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Add your favorite skills</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <FormControl p={4}>
                        <FormLabel>Skills</FormLabel>
                        <Select
                          isMulti
                          options={allSkills}
                          value={selectedSkills}
                          onChange={setSelectedSkills}
                          variant="flushed"
                          placeholder="Select skills to filter..."
                          closeMenuOnSelect={false}
                          selectedOptionStyle="check"
                          tagVariant="subtle"
                          hideSelectedOptions={false}
                        />
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onCloseSkills}>
                        Save
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                <Box alignItems={'center'} justifyContent="center">
                  {selectedSkills.length === 0 && (
                    <Text fontSize={'sm'} color={'gray.500'}>
                      You have no favorite skills selected! Click the plus
                      button above to add your favorite skills!
                    </Text>
                  )}

                  {selectedSkills.map(skill => (
                    <Tag
                      size={'sm'}
                      m="1"
                      borderRadius="full"
                      variant="subtle"
                      colorScheme="gray"
                    >
                      <TagLabel>{skill.label}</TagLabel>
                    </Tag>
                  ))}
                </Box>
              </FormControl>

              <FormControl id="email" mt={1}>
                <FormLabel>About</FormLabel>
                <Textarea
                  placeholder="Tell us about yourself. Other people will be able to see this."
                  rows={4}
                  value={bio}
                  onChange={event => setBio(event.target.value)}
                  shadow="sm"
                  focusBorderColor="brand.400"
                  fontSize={{
                    sm: 'sm',
                  }}
                />
              </FormControl>

              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  onClick={handleSubmit}
                  size="lg"
                  color={'white'}
                  colorScheme="blue"
                  bgGradient="linear(to-r, blue.300, blue.600)"
                  _hover={{ bgGradient: 'linear(to-r, blue.200, blue.500)' }}
                >
                  Register
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? Click{' '}
                  <Link to="/login" style={{ color: '#4299E1' }}>
                    here
                  </Link>{' '}
                  to log in!
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      <Footer />
    </>
  );
}
