/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdAdd } from 'react-icons/md';
import CreateKeyLoans from '../../components/CreateKeyLoan';
import EditBelongingForm from '../../components/EditKeyLoan';
import Layout from '../../components/Layout';
import { generateXlsx } from '../../helpers/exportTable';
import useKeyLoans from '../../hooks/useKeyLoans';
import { KeyLoanModel, deleteKeyLoan } from '../../services/keyLoans';
import { CardKeyLoan, DisplayEntries } from './styles.keys';
import SelectInput from '../../components/SelectInput';

export default function Keys() {
  const { loans } = useKeyLoans();
  const createModal = useDisclosure();
  const editModal = useDisclosure();
  const [loanId, setLoanId] = useState<number>();
  const [searchParam] = useState(['reason', 'responsible_name', 'responsible_register', 'responsible_phone']);
  const [searchItem, setSearchItem] = useState<string>('');

  const [selectedPiso, setSelectedPiso] = useState<string | null>(null);
  const [selectedBloco, setSelectedBloco] = useState<string | null>(null);

  const blocos = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
  ];

  const pisos = [
    { value: 'SUPERIOR', label: 'Superior' },
    { value: 'TERREO', label: 'Térreo' },
  ];

  const handleSearch = (loans: KeyLoanModel[]) => {
    return loans.filter((item) => {
      const matchesSearch = searchParam.some((newItem) => {
        return (item as any)[newItem].toString().toLowerCase().indexOf(searchItem.toLowerCase()) > -1;
      });

      const matchesPiso = selectedPiso ? item.key?.piso === selectedPiso : true;
      const matchesBloco = selectedBloco ? item.key?.bloco === selectedBloco : true;

      return matchesSearch && matchesPiso && matchesBloco;
    });
  };

  const handleRemove = React.useCallback(
    async (Loan: KeyLoanModel) => {
      const proceed = confirm('Tem Certeza que deseja deletar o Emprestimo?');

      if (!proceed) return;

      try {
        await deleteKeyLoan(Loan.id);
        window.location.reload();
      } catch (error) {
        throw new Error('Erro aqui');
      }
    },
    [deleteKeyLoan],
  );

  return (
    <>
      <CreateKeyLoans isOpen={createModal.isOpen} onClose={createModal.onClose} />
      <EditBelongingForm isOpen={editModal.isOpen} onClose={editModal.onClose} loanId={loanId!} />
      <Layout>
        <Box w="100%" maxW="1040px" margin="0 50px">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" color="#118D3B" fontWeight="600">
                Claviculário
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Text mb={5} color="#afafaf">
            Cadastre aqui entradas e saídas de chaves do claviculário.
          </Text>
          <Box w="100%" display="flex" justifyContent="space-between" alignItems="center">
            <Input
              w="50%"
              placeholder="Pesquisar chave"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />

            <Box>
              <Button
                bg="#2f80ed"
                color="white"
                variant="primary"
                onClick={() => generateXlsx(handleSearch(loans), 'Chaves')}
                leftIcon={<MdAdd />}
                marginRight={3}
              >
                Exportar
              </Button>
              <Button onClick={createModal.onOpen} bg="#118D3B" color="white" variant="primary" leftIcon={<MdAdd />}>
                Cadastrar
              </Button>
            </Box>
          </Box>
          <Box display={`flex`} gap={`10px`}>
            <SelectInput
              label={`Piso`}
              options={pisos}
              maxWidth={`200px`}
              width={`100%`}
              value={selectedPiso!}
              onChange={(option) => setSelectedPiso(option.target.value || null)}
            />
            <SelectInput
              label={`Bloco`}
              options={blocos}
              maxWidth={`200px`}
              value={selectedBloco!}
              width={`100%`}
              onChange={(option) => setSelectedBloco(option.target.value || null)}
            />
          </Box>
          <Box mt={5} textAlign="center">
            {!!handleSearch(loans) && handleSearch(loans).length === 0 ? (
              <Text mx={5} color="#afafaf">
                Sem items
              </Text>
            ) : (
              handleSearch(loans).map((item) => (
                <CardKeyLoan key={item.id}>
                  <Box
                    m={1}
                    display="flex"
                    alignItems="center"
                    flexDirection={{ base: 'column-reverse', md: 'row' }}
                    justifyContent="space-between"
                  >
                    <Box my={3} display="flex" alignItems="center" justifyContent="center" gap={3}>
                      <Text m={0} fontWeight="600" fontSize={14}>
                        {item.responsible_name}
                      </Text>
                      <Badge ms={2} variant="outline" colorScheme="blue">
                        {item.responsible_register}
                      </Badge>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Badge
                        px={2}
                        borderRadius={4}
                        variant="solid"
                        mx={5}
                        colorScheme={`${item.key.is_avaible ? 'green' : 'red'}`}
                      >
                        {`${item.key.name} - Bloco ${item.key.bloco} - ${item.key.piso}`}
                      </Badge>
                      <Menu>
                        <MenuButton>
                          <BsThreeDotsVertical />
                        </MenuButton>
                        <MenuList>
                          <MenuItem onClick={() => handleRemove(item)}>Deletar</MenuItem>
                          <MenuItem
                            onClick={() => {
                              setLoanId(item.id);
                              editModal.onOpen();
                            }}
                          >
                            Ver Detalhes
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Box>
                  </Box>
                  <Box my={3} textAlign="start">
                    {item.reason}
                  </Box>
                  <DisplayEntries>
                    <span>Saída: {item.createdAt}</span>
                    <span>
                      Devolução:{' '}
                      {item.key.is_avaible ? (
                        <Badge ms={2} variant="outline" colorScheme="green">
                          {item.updatedAt}
                        </Badge>
                      ) : (
                        <Badge ms={2} variant="outline" colorScheme="red">
                          Não Foi devolvida.
                        </Badge>
                      )}
                    </span>
                  </DisplayEntries>
                </CardKeyLoan>
              ))
            )}
          </Box>
        </Box>
      </Layout>
    </>
  );
}
