import { Stack, useColorModeValue } from '@chakra-ui/react';
import { NAV_ITEMS } from '../data/options';
import MobileNavbarItem from './MobileNavbarItem';

const MobileNavbar = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map(navItem => (
        <MobileNavbarItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

export default MobileNavbar;
