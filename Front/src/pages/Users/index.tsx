import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { MdAdd, MdErrorOutline } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import CreateUsers from '../../components/CreateUsers';
import Layout from '../../components/Layout';
import useUsers from '../../hooks/useUsers';
import { deleteUser } from '../../services/users';

export default function Users() {
  const createModal = useDisclosure();
  const { users } = useUsers();

  const handleRemove = async (id: number) => {
    const proceed = confirm('Tem Certeza que deseja deletar o Emprestimo?');

    if (!proceed) return;

    try {
      await deleteUser(id);
      window.location.reload();
    } catch (error) {
      throw new Error('Erro aqui');
    }
  };
  return (
    <>
      <CreateUsers isOpen={createModal.isOpen} onClose={createModal.onClose} />
      <Layout>
        <Box w="100%" maxW="1040px" margin="0 50px">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" color="#118D3B" fontWeight="600">
                Usuários
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Text mb={5} color="#afafaf">
            Cadastre aqui entrada e saída de Visitantes.
          </Text>
          <Box w="100%" display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Button onClick={createModal.onOpen} bg="#118D3B" color="white" variant="primary" leftIcon={<MdAdd />}>
                Cadastrar
              </Button>
            </Box>
          </Box>
          <Box mt={8} textAlign="center">
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>E-mail</Th>
                    <Th>Cargo</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users?.map((item) => (
                    <Tr key={item.id}>
                      <Td>{item.name}</Td>
                      <Td>{item.email}</Td>
                      <Td justifyContent={`center`}>
                        <Badge
                          colorScheme="green"
                          maxWidth={`150px`}
                          justifyContent={`center`}
                          width={`100%`}
                          textAlign={`center`}
                        >
                          {item.level}
                        </Badge>
                      </Td>
                      <Td>
                        <Button colorScheme="red" mr={3} onClick={() => handleRemove(item.id)}>
                          <FaRegTrashAlt />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Layout>
    </>
  );
}
