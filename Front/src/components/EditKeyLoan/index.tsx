/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Badge,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
} from '@chakra-ui/react';
import { useLayoutEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyModel } from '../../services/Key';
import { EditKeyLoanPayload, editKeyLoan, getLoanById } from '../../services/keyLoans';
import Input from '../Input';
import PhoneInput from '../PhoneInput';
import RegisterInput from '../RegisterInput';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  loanId: number;
}

const EditKeyLoanForm = ({ onClose, isOpen, loanId }: IProps) => {
  const [key, setKey] = useState<KeyModel>();
  const {
    handleSubmit,
    control,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm<EditKeyLoanPayload>({
    defaultValues: {
      isAvaible: false,
      reason: void 0,
      responsiblePerson: {
        name: void 0,
        register: void 0,
        phone: void 0,
      },
    },
  });

  useLayoutEffect(() => {
    const getLoan = async () => {
      if (loanId) {
        //debugger
        const currentLoan = await getLoanById(loanId);
        setKey(currentLoan.key);

        reset({
          isAvaible: currentLoan.key.is_avaible,
          reason: currentLoan.reason!,
          keyId: currentLoan.key.id,
          responsiblePerson: {
            name: currentLoan.responsible_name!,
            register: currentLoan.responsible_register!,
            phone: currentLoan.responsible_phone!,
          },
        });
      }
    };

    getLoan();
    return () => { };
  }, [loanId, reset]);

  async function onSubmit(values: EditKeyLoanPayload) {
    try {
      reset();
      await editKeyLoan(loanId, values)
      console.log(values);
      onClose();

      window.location.reload()
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
          <ModalHeader>Editar Empréstimo</ModalHeader>
          <ModalCloseButton />
          <ModalBody w="100%">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Badge
                px={2}
                borderRadius={4}
                variant="solid"
                my={2}
                colorScheme={`${key?.is_avaible ? 'green' : 'red'}`}
              >
                {key?.name}
              </Badge>
              <Box my={3}>
                <Text>Foi devolvido?</Text>
                <Controller
                  name="isAvaible"
                  control={control}
                  render={({ field: { value } }) => (
                    <Switch
                      colorScheme="teal"
                      size="md"
                      isChecked={value}
                      onChange={() => {
                        value ? setValue('isAvaible', false) : setValue('isAvaible', true)
                      }}
                    />
                  )}
                />
              </Box>



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
                name="responsiblePerson.register"
                control={control}
                defaultValue=""
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
      </Modal >
    </>
  );
};

export default EditKeyLoanForm;
