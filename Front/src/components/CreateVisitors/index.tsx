import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { CreateVisitorPayload, createVisitor } from '../../services/visitors';
import Input from '../Input';
import PhoneInput from '../PhoneInput';
import RegisterInput from '../RegisterInput';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}


const CreateVisitors = ({ isOpen, onClose }: IProps) => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateVisitorPayload>({
    defaultValues: {
      reason: void 0,
      responsiblePerson: {
        name: void 0,
        cpf: void 0,
        phone: void 0,
      },
    },
  });
  async function onSubmit(values: CreateVisitorPayload) {
    try {
      reset();
      await createVisitor(values)
      onClose()
      window.location.reload()
    } catch (_error) {
      console.error(_error);
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => {
        onClose();
        reset();
      }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Novo Visitante</ModalHeader>
          <ModalCloseButton />
          <ModalBody w="100%">
            <form onSubmit={handleSubmit(onSubmit)}>


              <Input
                {...register('responsiblePerson.name', { required: 'Digite o Nome Completo' })}
                label="Nome"
                placeholder="Nome Completo"
                error={errors.responsiblePerson?.name?.message}
              />

              <Controller
                name='responsiblePerson.phone'
                control={control}
                defaultValue=''
                rules={{ required: 'Digite o Telefone' }}
                render={({ field }) => (
                  <PhoneInput
                    label="Telefone"
                    placeholder="(xx) x xxxx-xxxx"
                    onAccept={field.onChange}
                    value={field.value}
                  />
                )}
              />
              <Controller
                name='responsiblePerson.cpf'
                control={control}
                defaultValue=''
                rules={{ required: 'Digite a Matricula' }}
                render={({ field }) => (
                  <RegisterInput
                    label="Matrícula"
                    placeholder="xxxxxxxxxxxxx-x"
                    onAccept={field.onChange}
                    value={field.value}
                  />
                )}
              />

              <Input {...register('reason', { required: 'Escreva o Motivo' })}
                label="Motivo" multiline rows={3}
                error={errors.reason?.message}
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

export default CreateVisitors