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
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdAdd, MdCheck } from 'react-icons/md';
import CreateVisitors from '../../components/CreateVisitors';
import Layout from '../../components/Layout';
import useVisitors from '../../hooks/useVisitors';
import { CardVisitors } from './styles.visitors';

export default function Visitors() {
  const { Visitors } = useVisitors();
  const createModal = useDisclosure();

  function MenuResponsiveMD() {
    return (
      <Box display={{ base: 'none', md: 'block' }}>
        {' '}
        <Menu>
          <MenuButton>
            <BsThreeDotsVertical />
          </MenuButton>
          <MenuList>
            <MenuItem>Deletar</MenuItem>
            <MenuItem>Ver Detalhes</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    );
  }

  function MenuResponsive() {
    return (
      <Box display={{ base: 'block', md: 'none' }}>
        {' '}
        <Menu>
          <MenuButton>
            <BsThreeDotsVertical />
          </MenuButton>
          <MenuList>
            <MenuItem>Deletar</MenuItem>
            <MenuItem>Ver Detalhes</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    );
  }

  return (
    <>
      <CreateVisitors isOpen={createModal.isOpen} onClose={createModal.onClose} />
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
            <Input w="50%" placeholder="Pesquisar Visitante" />
            <Button onClick={createModal.onOpen} bg="#2f80ed" color="white" variant="primary" leftIcon={<MdAdd />}>
              Cadastrar
            </Button>
          </Box>
          <Box mt={5} textAlign="center">
            {!!Visitors && Visitors.length === 0 ? (
              <Text mx={5} color="#afafaf">
                Sem items
              </Text>
            ) : (
              !!Visitors &&
              Visitors.map((item) => (
                <>
                  <CardVisitors>
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
                        <MenuResponsive />
                      </Box>

                      <Box display="flex" gap={10} m="3">
                        <Text fontSize="sm" fontWeight="400">
                          Entrada:
                          <br /> {item.createdAt}
                        </Text>
                        <Text fontSize="sm" fontWeight="400">
                          Saída: <br />
                          {item.updatedAt ? (
                            item.updatedAt
                          ) : (
                            <Badge ms={2} variant="outline" colorScheme="red">
                              Não Saiu
                            </Badge>
                          )}
                        </Text>
                        <MenuResponsiveMD />
                      </Box>
                    </Box>

                    <Text m={3} textAlign="justify">
                      {item.reason}
                    </Text>

                    <Button color="white" size="sm" bg="#3DB273" mt={5} leftIcon={<MdCheck />}>
                      Confirmar Saída
                    </Button>
                  </CardVisitors>
                </>
              ))
            )}
          </Box>
        </Box>
      </Layout>
    </>
  );
}
