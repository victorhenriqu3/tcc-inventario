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
  useDisclosure
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdAdd } from 'react-icons/md';
import CreateKeyLoans from '../../components/CreateKeyLoan';
import Layout from '../../components/Layout';
import useKeyLoans from '../../hooks/useKeyLoans';
import { CardKeyLoan, DisplayEntries } from './styles.keys';

export default function Keys() {
  const { loans } = useKeyLoans();
  const createModal = useDisclosure()

  return (
    <>
      <CreateKeyLoans isOpen={createModal.isOpen} onClose={createModal.onClose} />
      <Layout>
        <Box w="100%" maxW="1040px">
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
            <Input w="50%" placeholder="Pesquisar chave" />
            <Button bg="#2f80ed" color="white" variant="primary" onClick={createModal.onOpen} leftIcon={<MdAdd />}>
              Cadastrar
            </Button>
          </Box>
          <Box mt={5} textAlign="center">
            {!!loans && loans.length === 0 ? (
              <Text mb={5} color="#afafaf">
                Sem items
              </Text>
            ) : (
              !!loans &&
              loans.map((item) => (
                <CardKeyLoan key={item.id}>
                  <Box display="flex" flexDirection="row" justifyContent="space-between">
                    <section>
                      <span>{item.responsible_name}</span>
                      {' | '}
                      <span>{item.responsible_register}</span>
                    </section>

                    <section>
                      <Badge
                        px={2}
                        borderRadius={4}
                        variant="solid"
                        mx={5}
                        colorScheme={`${item.key.is_avaible ? 'red' : 'green'}`}
                      >
                        {item.key.name}
                      </Badge>
                      <Menu>
                        <MenuButton>
                          <BsThreeDotsVertical />
                        </MenuButton>
                        <MenuList>
                          <MenuItem>Ver Detalhes</MenuItem>
                        </MenuList>
                      </Menu>
                    </section>
                  </Box>
                  <Box textAlign='start'>
                    {item.reason}
                  </Box>

                  <DisplayEntries>
                    <span>Saída: {item.createdAt}</span>
                    <span>
                      Devolução:
                      {item.updatedAt ?? (
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
