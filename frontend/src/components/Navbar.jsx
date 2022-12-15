import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Collapse,
  Badge,
  Flex,
  IconButton,
  Stack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Center,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLogged, logOut, getUser } from '../reducers/authSlice';
import { USER_BADGE_COLORS } from '../data/options';
export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();
  const registerButtonColor = useColorModeValue('gray.700', 'white');
  const navigate = useNavigate();
  const user = useSelector(getUser);

  return (
    <Box position="sticky" top="0" zIndex={'5'}>
      <Flex
        bg={useColorModeValue('white', 'gray.900')}
        color={useColorModeValue('gray.700', 'white')}
        h={'64px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link to="/">
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              fontSize={'2xl'}
              fontWeight={'700'}
              bgGradient="linear(to-r, blue.300, blue.600)"
              bgClip="text"
              ml={'5'}
            >
              TaskForce
            </Text>
          </Link>
          <Flex
            display={{ base: 'none', md: 'flex' }}
            alignItems="center"
            ml={10}
          >
            <DesktopNavbar />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          alignItems="center"
          direction={'row'}
          spacing={5}
        >
          {!isLogged && <ColorModeSwitcher />}

          {!isLogged && (
            <>
              <Link to="/register">
                <Button
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={registerButtonColor}
                  variant="link"
                  href={'#'}
                >
                  Register
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  mr="5"
                  fontWeight={600}
                  color={'white'}
                  colorScheme="blue"
                  bgGradient="linear(to-r, blue.300, blue.600)"
                  _hover={{ bgGradient: 'linear(to-r, blue.200, blue.500)' }}
                >
                  Log in
                </Button>
              </Link>
            </>
          )}
          {isLogged && (
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                mr="5"
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  // name={user ? `${user.name} ${user.surname}` : null}
                  p={'1'}
                  bgGradient="linear(to-r, blue.300, blue.600)"
                  _hover={{ bgGradient: 'linear(to-r, blue.200, blue.500)' }}
                />
              </MenuButton>
              <MenuList alignItems={'center'}>
                <br />
                <Center>
                  <Avatar
                    color={'white'}
                    colorScheme="blue"
                    bgGradient="linear(to-r, blue.300, blue.600)"
                    _hover={{ bgGradient: 'linear(to-r, blue.200, blue.500)' }}
                    name={user ? `${user.name} ${user.surname}` : null}
                    size={'xl'}
                  />
                </Center>
                <br />
                <Center>
                  <Text fontWeight={'600'}>
                    {user && `${user.name} ${user.surname}`}
                  </Text>
                </Center>
                <Center>
                  <Badge colorScheme={USER_BADGE_COLORS[user?.sub_tier]} m="1">
                    {user?.sub_tier}
                  </Badge>
                </Center>
                {/* <br /> */}
                <MenuDivider />
                <Center>
                  <Text>{user && `Credits: ${user.credit_count}`}</Text>
                </Center>
                <MenuDivider />
                <Center>
                  <Text>
                    {user && `You have ${user.match_credit} free matches`}
                  </Text>
                </Center>
                <MenuDivider />
                <Center>
                  Toggle Theme <ColorModeSwitcher />
                </Center>
                {/* <MenuItem icon={<ColorModeSwitcher />}>Toggle Theme </MenuItem> */}
                <MenuDivider />
                <Link to="/profile">
                  <MenuItem>My Profile</MenuItem>
                </Link>

                <Link to="/omer">
                  <MenuItem>Omerin Yeri</MenuItem>
                </Link>
                <MenuItem>Notifications</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(logOut());
                    navigate('/');
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNavbar />
      </Collapse>
    </Box>
  );
}
