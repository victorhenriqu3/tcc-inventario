import { Badge, Box, MenuItem, MenuList, Text } from '@chakra-ui/react';
import React from 'react';
import { CardVisitors } from '../../pages/Visitors/styles.visitors';
import { deleteUser } from '../../services/users';
import { User } from '../../types';
import { MenuResponsive, MenuResponsiveMD } from '../Menu';

const CardUser: React.FunctionComponent<User> = (props) => {
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
    <CardVisitors key={props.id}>
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
              {props.name}
            </Text>
          </Box>
          <MenuResponsive>
            <MenuList>
              <MenuItem onClick={() => handleRemove(props.id)}>Deletar</MenuItem>
              <MenuItem>Ver Detalhes</MenuItem>
            </MenuList>
          </MenuResponsive>
        </Box>

        <Box display="flex" gap={10} m="3">
          <Badge variant="outline" colorScheme="green" width={`150px`} maxWidth={`100%`}>
            {props.level}
          </Badge>
          <MenuResponsiveMD>
            <MenuList>
              <MenuItem>Deletar</MenuItem>
              <MenuItem>Ver Detalhes</MenuItem>
            </MenuList>
          </MenuResponsiveMD>
        </Box>
      </Box>
      <Text m={3} textAlign="justify">
        {props.email}
      </Text>

      <Text m={3} textAlign="justify"></Text>
    </CardVisitors>
  );
};
export default CardUser;
