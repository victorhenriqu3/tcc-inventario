import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Input, Text, useDisclosure } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import useEvents from '../../hooks/useEvents';
import { MdAdd } from 'react-icons/md';
import CreateEvents from '../../components/CreateEvents';

export default function Events() {
  const { events } = useEvents();
  const createModal = useDisclosure();
  return (
    <>
      <CreateEvents isOpen={createModal.isOpen} onClose={createModal.onClose} />
      <Layout>
        <Box w="100%" maxW="1040px" margin="0 50px">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" color="#118D3B" fontWeight="600">
                Eventos
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Text mb={5} color="#afafaf">
            Cadastre aqui os eventos de Visitantes.
          </Text>
          <Box w="100%" display="flex" justifyContent="space-between" alignItems="center">
            <Input w="50%" placeholder="Pesquisar chave" />
            <Box>
              <Button bg="#118D3B" color="white" variant="primary" leftIcon={<MdAdd />} onClick={createModal.onOpen}>
                Cadastrar
              </Button>
            </Box>
          </Box>
          <Box w="100%" display={`flex`} flexDirection={`column`}>
            {events?.map((item) => (
              <Box my={3} key={item.id} boxShadow={`2px 2px 4px 3px rgba(0,0,0,0.08)`} borderRadius={`10px`} p={5}>
                <Text fontWeight="600">{item.name}</Text>
                <Box>{item.description}</Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Layout>
    </>
  );
}
