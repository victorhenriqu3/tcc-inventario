import { Box, Button, Flex, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react';

// eslint-disable-next-line import/named
import { NavLink, RouteObject } from 'react-router-dom';
import { Separator } from '../Separator';

interface ISidebar {
  routes: RouteObject[];
}

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
              _hover="none"
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
              py="12px"
              borderRadius="15px"
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
              <Flex>{prop.id}</Flex>
            </Button>
          ) : (
            <Button
              boxSize="initial"
              justifyContent="flex-start"
              alignItems="center"
              bg="transparent"
              mb={{
                xl: '12px',
              }}
              mx={{
                xl: 'auto',
              }}
              py="12px"
              ps={{
                sm: '10px',
                xl: '16px',
              }}
              borderRadius="15px"
              _hover="none"
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
                <Text color={inactiveColor} my="auto" fontSize="sm">
                  {prop.id}
                </Text>
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
        <Image src="/logo-IFRO.png" width={200} pt={5} />
      </Box>
      <Separator></Separator>
      <Stack direction="column" my="40px">
        <Box>{createLinks()} </Box>
      </Stack>
    </>
  );
}
