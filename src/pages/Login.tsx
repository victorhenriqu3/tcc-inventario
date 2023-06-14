import { Box, Button, Container, FormControl, FormErrorMessage, FormLabel, Input, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import PasswordField from '../components/PasswordField';

interface ILoginForm {
  email?: string;
  password?: string;
}

function Login() {
  const toast = useToast()
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginForm>();
  const onSubmit = handleSubmit((data) => {
    if (data.email === 'victor@gmail.com' && data.password === 'password') {
      navigate('/')
    } else {
      reset()
      !toast.isActive('loginError') && toast({
        id: 'loginError', description: 'Email e/ou Senha estão Incorretos', status: 'error',
        position: 'top',
        duration: 9000,
        isClosable: true,
      })
    }

  }


  );
  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
        </Stack>

        <Box py={{ base: '0', sm: '8' }} px={{ base: '4', sm: '10' }} borderRadius={{ base: 'none', sm: 'xl' }}>
          <Stack spacing="6">
            <form onSubmit={onSubmit}>
              <Stack spacing="5">


                <FormControl isInvalid={!!errors.email}>
                  <FormLabel htmlFor="email">E-mail</FormLabel>
                  <Input
                    id="email"
                    placeholder="Email"
                    {...register('email', {
                      required: 'Insira seu email.',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Por favor, preencha com formato solicitado, inclua o '@'.",
                      },
                    })}
                  />
                  <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>


                <FormControl isInvalid={!!errors.password}>
                  <PasswordField
                    {...register('password', {
                      required: 'Insira a sua senha.',
                      minLength: { value: 4, message: 'A senha tem pelo menos 4 caracteres.' },
                    })}
                  />
                  <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                </FormControl>
              </Stack>
              <Stack spacing="5">
                <Button bg="#38a169" color="white" variant="primary" type="submit" mt={5}>
                  Login
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

export default Login;
