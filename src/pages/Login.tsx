import { Box, Button, Container, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { Logo } from '../components/Logo';
import PasswordField from '../components/PasswordField';

function Login() {
  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
        </Stack>

        <Box py={{ base: '0', sm: '8' }} px={{ base: '4', sm: '10' }} borderRadius={{ base: 'none', sm: 'xl' }}>
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <Input id="email" type="email" />
              </FormControl>
              <PasswordField />
            </Stack>
            <Stack spacing="6">
              <Button bg="#38a169" color="white" variant="primary">
                Login
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

export default Login;
