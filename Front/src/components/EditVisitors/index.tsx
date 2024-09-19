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
import { Controller, useForm } from 'react-hook-form';
import { CreateVisitorPayload, editVisitor, getVisitorById } from '../../services/visitors';
import Input from '../Input';
import PhoneInput from '../PhoneInput';
import CPFInput from '../CPFInput/CPFInput';
import { useLayoutEffect } from 'react';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  visitorId: number;
}

const EditVisitorsForm = ({ onClose, isOpen, visitorId }: IProps) => {
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

  useLayoutEffect(() => {
    const getVisitor = async () => {
      if (visitorId) {
        const currentLoan = await getVisitorById(visitorId);

        reset({
          reason: currentLoan.reason!,
          responsiblePerson: {
            name: currentLoan.name!,
            cpf: currentLoan.cpf!,
            phone: currentLoan.phone!,
          },
        });
      }
    };

    getVisitor();
  }, [visitorId, reset]);

  async function onSubmit(values: CreateVisitorPayload) {
    try {
      reset();
      await editVisitor(visitorId, values);

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
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Empréstimo</ModalHeader>
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
                name="responsiblePerson.phone"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Digite o Telefone',
                }}
                render={({ field }) => (
                  <PhoneInput
                    label="Telefone"
                    placeholder="(xx) x xxxx-xxxx"
                    onAccept={field.onChange}
                    value={field.value}
                    error={errors.responsiblePerson?.phone?.message}
                  />
                )}
              />
              <Controller
                name="responsiblePerson.cpf"
                control={control}
                defaultValue=""
                rules={{ required: 'Digite o CPF' }}
                render={({ field }) => (
                  <CPFInput
                    label="CPF"
                    unmask={false}
                    placeholder="XXX.XXX.XXX-XX"
                    onAccept={field.onChange}
                    value={field.value}
                    error={errors.responsiblePerson?.cpf?.message}
                  />
                )}
              />

              <Input
                {...register('reason', { required: 'Escreva o Motivo' })}
                label="Motivo"
                multiline
                rows={3}
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

export default EditVisitorsForm;
