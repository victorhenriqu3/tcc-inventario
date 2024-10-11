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
import { CreateVisitorPayload, createVisitor } from '../../services/visitors';
import CPFInput from '../CPFInput/CPFInput';
import Input from '../Input';
import PhoneInput from '../PhoneInput';
import SelectInput from '../SelectInput';
import { ErrorField } from '../ErrorField';
import SelectEvents from '../SelectKeys copy';
import useUsers from '../../hooks/useUsers';

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
    watch,
    formState: { errors },
  } = useForm<CreateVisitorPayload>({
    defaultValues: {},
  });

  const selectedNature = watch('nature');

  const natures = [
    { label: 'Evento', value: 'Evento' },
    { label: 'Visita Técnica', value: 'Visita_Tecnica' },
    { label: 'Visita Institucional:', value: 'Visita_Institucional:' },
    { label: 'Atendimento ao Público', value: 'Atendimento_Público' },
  ];

  const { users } = useUsers();
  async function onSubmit(values: CreateVisitorPayload) {
    try {
      reset();
      await createVisitor(values);
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
                    placeholder="XXX.XXX.XXX-XX"
                    onAccept={field.onChange}
                    value={field.value}
                    error={errors.responsiblePerson?.cpf?.message}
                  />
                )}
              />

              <Controller
                name="nature"
                control={control}
                defaultValue=""
                rules={{ required: 'Selecione uma Natureza' }}
                render={({ field }) => (
                  <SelectInput
                    label="Selecione a Natureza"
                    options={natures}
                    {...field}
                    error={errors.nature?.message}
                  />
                )}
              />

              {selectedNature === 'Evento' && (
                <>
                  <Controller
                    name="evento_id"
                    control={control}
                    render={({ field }) => (
                      <SelectEvents label="Selecione um Evento" value={field.value} onChange={field.onChange} />
                    )}
                  />
                  {!!errors.evento_id && <ErrorField>{errors.evento_id.message}</ErrorField>}
                </>
              )}

              <Controller
                name="responsableUserId"
                control={control}
                rules={{ required: 'Selecione um Destino' }}
                render={({ field }) => (
                  <SelectInput
                    label="Destino da Visita"
                    options={users ? users?.map((user) => ({ label: user.name, value: user.id })) : []}
                    {...field}
                    error={errors.responsableUserId?.message}
                  />
                )}
              />

              <Controller
                name="responsableUserId"
                control={control}
                rules={{ required: 'Selecione um Servidor Responsável' }}
                render={({ field }) => (
                  <SelectInput
                    label="Servidor Responsável"
                    options={users ? users?.map((user) => ({ label: user.name, value: user.id })) : []}
                    {...field}
                    error={errors.responsableUserId?.message}
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

export default CreateVisitors;
