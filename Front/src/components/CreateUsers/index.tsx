import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';

import { IUserDTO, registerUser } from '../../services/users';
import Input from '../Input';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateUsers = ({ isOpen, onClose }: IProps) => {
  const { handleSubmit, control, register, reset } = useForm<IUserDTO>({
    defaultValues: {
      name: void 0,
      email: void 0,
      level: void 0,
      password: void 0,
      password_confirmation: void 0,
    },
  });
  async function onSubmit(values: IUserDTO) {
    try {
      reset();
      await registerUser(values);
      onClose();
      window.location.reload();
    } catch (_error) {
      console.error(_error);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Novo Usuário</ModalHeader>
        <ModalCloseButton />
        <ModalBody w="100%">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register('name', { required: 'Digite o Nome Completo' })}
              label="Nome"
              placeholder="Nome Completo"
            />
            <Input
              {...register('email', { required: 'Digite o email' })}
              label="Email"
              placeholder="seuemail@email.com"
            />

            <Controller
              control={control}
              name="level"
              render={({ field }) => (
                <Select placeholder="Selecione level ..." {...field}>
                  <option value="COORDENADOR">Coordenador</option>
                  <option value="PROFESSOR">Professor</option>
                  <option value="ADMIN">Admin</option>
                </Select>
              )}
            />

            <Input
              label="Senha"
              type="password"
              {...register('password', {
                required: 'Insira a sua senha.',
                minLength: { value: 4, message: 'A senha tem pelo menos 4 caracteres.' },
              })}
            />

            <Input
              label="Confirmar Senha"
              type="password"
              {...register('password_confirmation', {
                required: 'Confirme a sua senha.',
                minLength: { value: 4, message: 'A senha tem pelo menos 4 caracteres.' },
              })}
            />

            <Box my={2} me={0} display="flex" justifyContent="end">
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="green" mr={3} type="submit">
                Salvar
              </Button>
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateUsers;
