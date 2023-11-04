import { Box, Button, Flex, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { MdKey, MdPersonPin } from 'react-icons/md';
import styled from '@emotion/styled';
// eslint-disable-next-line import/named
import { Link, NavLink, RouteObject } from 'react-router-dom';
import { Separator } from '../Separator';

interface ISidebar {
  routes: RouteObject[];
}

const Label = styled(Text)`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 8px;
  }
`;

export default function SidebarContent({ routes }: ISidebar) {
  const activeRoute = (routeName?: string) => {
    return location.pathname === routeName ? 'active' : '';
  };
  const createLinks = () => {
    // Chakra Color Mode
    const activeBg = useColorModeValue('white', 'gray.700');
    const activeColor = useColorModeValue('gray.700', 'white');
    const inactiveColor = useColorModeValue('gray.400', 'gray.400');

    return routes.map((prop) => {
      return (
        <NavLink to={`${prop.path}`} key={prop.id}>
          {activeRoute(prop.path) === 'active' ? (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg={activeBg}
              color={activeColor}
              _hover={{}}
              mb={{
                xl: '12px',
              }}
              mx={{
                xl: 'auto',
              }}
              ps={{
                sm: '10px',
                xl: '16px',
              }}
              py="8px"
              w="100%"
              _active={{
                bg: 'inherit',
                transform: 'none',
                borderColor: 'transparent',
              }}
              _focus={{
                boxShadow: 'none',
              }}
            >
              <Flex>
                <Label my="auto" fontSize="sm">
                  {prop.id === 'Visitantes' ? <MdPersonPin size={20} /> : ''}
                  {prop.id === 'Chaves' ? <MdKey size={20} /> : ''}
                  {prop.id}
                </Label>
              </Flex>
            </Button>
          ) : (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg="transparent"
              _hover={{}}
              mb={{
                xl: '12px',
              }}
              mx={{
                xl: 'auto',
              }}
              ps={{
                sm: '10px',
                xl: '16px',
              }}
              py="8px"
              w="100%"
              _active={{
                bg: 'inherit',
                transform: 'none',
                borderColor: 'transparent',
              }}
              _focus={{
                boxShadow: 'none',
              }}
            >
              <Flex>
                <Label color={inactiveColor} my="auto" fontSize="sm">
                  {prop.id === 'Visitantes' ? <MdPersonPin size={20} /> : ''}
                  {prop.id === 'Chaves' ? <MdKey size={20} /> : ''}
                  {prop.id}
                </Label>
              </Flex>
            </Button>
          )}
        </NavLink>
      );
    });
  };
  return (
    <>
      <Box pt={'25px'} mb="12px">
        <Link to='/'>
          <Image src="/logo-IFRO.png" width={200} pt={5} />
        </Link>

      </Box>
      <Separator></Separator>
      <Stack direction="column" my="40px">
        <Box>{createLinks()} </Box>
      </Stack>
    </>
  );
}
