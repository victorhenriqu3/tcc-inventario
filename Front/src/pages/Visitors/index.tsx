import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Input,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdAdd, MdCheck } from 'react-icons/md';
import CreateVisitors from '../../components/CreateVisitors';
import EditVisitorsForm from '../../components/EditVisitors';
import Layout from '../../components/Layout';
import { MenuResponsive, MenuResponsiveMD } from '../../components/Menu';
import SelectInput from '../../components/SelectInput';
import { generateXlsx } from '../../helpers/exportTable';
import useVisitors from '../../hooks/useVisitors';
import { VisitorsModel, deleteVisitor, updateVisitor } from '../../services/visitors';

import { getNature } from '../../types/Enums/ENature';
import { getPiso } from '../../types/Enums/EPiso';
import { CardVisitors } from './styles.visitors';

export default function Visitors() {
  const { Visitors } = useVisitors();
  const createModal = useDisclosure();
  const editModal = useDisclosure();

  const [searchParam] = useState(['reason', 'name', 'cpf', 'phone']);
  const [searchItem, setSearchItem] = useState<string>('');

  const [visitorId, setVisitorId] = useState<number>();

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

  const handleSearch = (visitors: VisitorsModel[]) => {
    return visitors.filter((item) => {
      const matchesSearch = searchParam.some((newItem) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (item as any)[newItem]?.toString().toLowerCase().includes(searchItem.toLowerCase());
      });

      const matchesPiso = selectedPiso ? item.keyInfo?.piso === selectedPiso : true;
      const matchesBloco = selectedBloco ? item.keyInfo?.bloco === selectedBloco : true;

      return matchesSearch && matchesPiso && matchesBloco;
    });
  };

  const handleRemove = React.useCallback(
    async (Visitor: VisitorsModel) => {
      const proceed = confirm('Tem Certeza que deseja deletar o Visitante?');

      if (!proceed) return;

      try {
        await deleteVisitor(Visitor.id);
        window.location.reload();
      } catch (error) {
        confirm('Erro no servidor, tente novamente.');
        throw new Error('Erro no servidor, tente novamente.');
      }
    },
    [deleteVisitor],
  );

  const handleUpdateStatus = React.useCallback(
    async (Visitor: VisitorsModel) => {
      const proceed = confirm('Confirmar a saída do Visitante?');

      if (!proceed) return;

      try {
        await updateVisitor(Visitor.id);
        window.location.reload();
      } catch (error) {
        confirm('Erro no servidor, tente novamente.');
        throw new Error('Erro no servidor, tente novamente.');
      }
    },
    [updateVisitor],
  );

  return (
    <>
      <CreateVisitors isOpen={createModal.isOpen} onClose={createModal.onClose} />
      <EditVisitorsForm isOpen={editModal.isOpen} onClose={editModal.onClose} visitorId={visitorId!} />
      <Layout>
        <Box w="100%" maxW="1040px" margin="0 50px">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" color="#118D3B" fontWeight="600">
                Visitantes
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Text mb={5} color="#afafaf">
            Cadastre aqui entrada e saída de Visitantes.
          </Text>
          <Box w="100%" display="flex" justifyContent="space-between" alignItems="center">
            <Input
              w="50%"
              placeholder="Pesquisar Visitante"
              value={searchItem}
              onChange={(e) => {
                setSearchItem(e.target.value);
              }}
            />
            <Box>
              <Button
                bg="#2f80ed"
                color="white"
                variant="primary"
                onClick={() => generateXlsx(handleSearch(Visitors), 'Visitantes')}
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
              onChange={(option) => setSelectedPiso(option.target.value || null)}
            />
            <SelectInput
              label={`Bloco`}
              options={blocos}
              maxWidth={`200px`}
              width={`100%`}
              onChange={(option) => setSelectedBloco(option.target.value || null)}
            />
          </Box>
          <Box mt={5} textAlign="center">
            {!!handleSearch(Visitors) && handleSearch(Visitors).length === 0 ? (
              <Text mx={5} color="#afafaf">
                Sem items
              </Text>
            ) : (
              handleSearch(Visitors).map((item) => (
                <CardVisitors key={item.id}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection={{ base: 'column', md: 'row' }}
                  >
                    <Box display="flex" alignItems="center">
                      {' '}
                      <Box m={3} display="flex" flexDirection="column" alignItems="start">
                        <Text fontSize="md" fontWeight="600">
                          {item.name}
                        </Text>
                        <Text fontSize="sm" fontWeight="400" color="gray.500">
                          {item.cpf} {item.phone ? `| ${item.phone} ` : ''}
                        </Text>
                      </Box>
                      <MenuResponsive>
                        <MenuList>
                          <MenuItem onClick={() => handleRemove(item)}>Deletar</MenuItem>
                          <MenuItem
                            onClick={() => {
                              setVisitorId(item.id);
                            }}
                          >
                            Ver Detalhes
                          </MenuItem>
                        </MenuList>
                      </MenuResponsive>
                    </Box>

                    <Box display="flex" gap={10} m="3">
                      <Text fontSize="sm" fontWeight="600">
                        Entrada:
                        <br />
                        <Text fontWeight="400">{item.createdAt}</Text>
                      </Text>
                      <Text fontSize="sm" fontWeight="600">
                        Saída: <br />
                        {item.updatedAt ? (
                          <Badge ms={2} variant="outline" colorScheme="green">
                            {item.updatedAt}
                          </Badge>
                        ) : (
                          <Badge ms={2} variant="outline" colorScheme="red">
                            Não Saiu
                          </Badge>
                        )}
                      </Text>
                      <MenuResponsiveMD>
                        <MenuList>
                          <MenuItem onClick={() => handleRemove(item)}>Deletar</MenuItem>
                          <MenuItem
                            onClick={() => {
                              setVisitorId(item.id);
                              editModal.onOpen();
                            }}
                          >
                            Ver Detalhes
                          </MenuItem>
                        </MenuList>
                      </MenuResponsiveMD>
                    </Box>
                  </Box>
                  <Text m={3} textAlign="justify">
                    {getNature(item.nature)} {item.event ? `| ${item.event.name} ` : ''}
                  </Text>
                  <Text fontSize="sm" fontWeight="400" color="gray.500" m={3} textAlign="justify">
                    {item.responsiblePerson.name} ( {item.keyInfo.name} | Bloco {item.keyInfo.bloco} |{' '}
                    {getPiso(item.keyInfo.piso)} )
                  </Text>

                  {/* <Text m={3} textAlign="justify">
                    {item.reason}
                  </Text> */}

                  {item.updatedAt ? (
                    <></>
                  ) : (
                    <Button
                      color="white"
                      size="sm"
                      bg="#3DB273"
                      mt={5}
                      leftIcon={<MdCheck />}
                      onClick={() => handleUpdateStatus(item)}
                    >
                      Confirmar Saída
                    </Button>
                  )}
                </CardVisitors>
              ))
            )}
          </Box>
        </Box>
      </Layout>
    </>
  );
}
