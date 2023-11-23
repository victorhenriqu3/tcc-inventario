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
import { CreateKeyLoanPayload, createKeyLoan } from '../../services/keyLoans';
import { ErrorField } from '../ErrorField';
import Input from '../Input';
import PhoneInput from '../PhoneInput';
import RegisterInput from '../RegisterInput';
import SelectKeys from '../SelectKeys';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}


const CreateKeyLoans = ({ isOpen, onClose }: IProps) => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateKeyLoanPayload>({
    defaultValues: {
      reason: void 0,
      responsiblePerson: {
        name: void 0,
        register: void 0,
        phone: void 0,
      },
    },
  });
  async function onSubmit(values: CreateKeyLoanPayload) {
    try {
      reset();
      await createKeyLoan(values)
      //console.log(values);
      onClose()
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
          <ModalHeader>Novo Empréstimo</ModalHeader>
          <ModalCloseButton />
          <ModalBody w="100%">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="keyId"
                rules={{
                  required: 'Escolha uma chave.',
                }}
                control={control}
                render={({ field }) => <SelectKeys label="Chave" value={field.value} onChange={field.onChange} />}
              />
              {!!errors.keyId && <ErrorField>{errors.keyId.message}</ErrorField>}


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
                name='responsiblePerson.register'
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

              <Input {...register('reason', { required: 'Escreva o Motivo' })} label="Motivo" multiline rows={3} error={errors.reason?.message} />
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

export default CreateKeyLoans;
