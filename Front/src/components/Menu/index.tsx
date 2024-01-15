import { Box, Menu, MenuButton } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface MenuResponsiveProps {
  children: React.ReactNode;
}

export function MenuResponsiveMD({ children }: MenuResponsiveProps) {
  return (
    <Box display={{ base: 'none', md: 'block' }}>
      {' '}
      <Menu>
        <MenuButton>
          <BsThreeDotsVertical />
        </MenuButton>
        {children}
      </Menu>
    </Box>
  );
}

export function MenuResponsive({ children }: MenuResponsiveProps) {
  return (
    <Box display={{ base: 'block', md: 'none' }}>
      {' '}
      <Menu>
        <MenuButton>
          <BsThreeDotsVertical />
        </MenuButton>
        {children}
      </Menu>
    </Box>
  );
}
