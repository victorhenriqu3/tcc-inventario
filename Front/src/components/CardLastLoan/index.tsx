import { Card, CardBody, CardFooter, Text } from '@chakra-ui/react';
import * as React from 'react';
import { KeyLoanModel } from '../../services/keyLoans';
import { KeyModel } from '../../services/Key';
import { getPiso } from '../../types/Enums/EPiso';

interface KeyLoanCard extends Omit<KeyLoanModel, 'key'> {
  keyInfo: KeyModel;
}
const CardLastLoan: React.FunctionComponent<KeyLoanCard> = (props) => {
  return (
    <>
      <Card bg="blue.500" color="white" borderRadius={16} w="100%" as="a" href="/keys">
        <CardBody display="flex" flexDirection="column" justifyContent="space-between">
          <Text fontWeight="600" fontSize={16} bg={'blue.600'} borderRadius={8} my={2} p={2}>
            Último Empréstimo
          </Text>
          <Text fontWeight="600">
            {props.keyInfo?.name} | Bloco {props.keyInfo?.bloco} | {getPiso(props.keyInfo?.piso)}
          </Text>
          <Text color="whiteAlpha.800" fontSize={14}>
            {props.responsible_name}
          </Text>
          <Text color="whiteAlpha.800" fontSize={14}>
            {props.responsible_phone}
          </Text>
          {/* <Text mt={3}>{props.reason}</Text> */}
        </CardBody>

        <CardFooter display={props.createdAt ? 'flex' : 'none'} flexDirection="row">
          <Text fontSize="sm" fontWeight="600" me={10}>
            Entrada:
            <br />
            <Text fontWeight="400">{props.createdAt}</Text>
          </Text>
          <Text fontSize="sm" fontWeight="600">
            Saída:
            <br />
            <Text fontWeight="400">{props.updatedAt ?? '--/--/----, --:--'}</Text>
          </Text>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardLastLoan;
