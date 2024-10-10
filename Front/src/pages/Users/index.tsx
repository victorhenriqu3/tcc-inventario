import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Text, useDisclosure } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import { MdAdd } from 'react-icons/md';
import CreateUsers from '../../components/CreateUsers';
import useUsers from '../../hooks/useUsers';
import CardUser from '../../components/CardUser';

export default function Users() {
  const createModal = useDisclosure();
  const { users } = useUsers();
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
          <Box mt={5} textAlign="center">
            {users?.map((item) => (
              <CardUser {...item} key={item.id} />
            ))}
          </Box>
        </Box>
      </Layout>
    </>
  );
}
