import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { Events, registerEvents } from '../../services/Events';
import { registerUser } from '../../services/users';
import Input from '../Input';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateEvents = ({ isOpen, onClose }: IProps) => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<Events>({
    defaultValues: {
      name: void 0,
      description: void 0,
    },
  });
  async function onSubmit(values: any) {
    try {
      reset();
      await registerEvents(values);
      onClose();
      window.location.reload();
    } catch (_error) {
      console.error(_error);
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Novo Evento</ModalHeader>
          <ModalCloseButton />
          <ModalBody w="100%">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input {...register('name', { required: 'Digite o Nome Completo' })} label="Nome do evento" />
              <Input
                {...register('description', { required: 'Digite uma descrição' })}
                label="Descrição do Evento"
                multiline
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
    </>
  );
};

export default CreateEvents;
